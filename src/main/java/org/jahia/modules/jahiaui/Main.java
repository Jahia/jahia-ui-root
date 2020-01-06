package org.jahia.modules.jahiaui;

import org.jahia.api.Constants;
import org.jahia.bin.Jahia;
import org.jahia.services.content.JCRNodeWrapper;
import org.jahia.services.content.JCRSessionFactory;
import org.jahia.services.content.JCRSessionWrapper;
import org.jahia.services.content.decorator.JCRUserNode;
import org.jahia.services.preferences.user.UserPreferencesHelper;
import org.jahia.services.render.RenderContext;
import org.jahia.services.render.Resource;
import org.jahia.services.usermanager.JahiaUser;
import org.jahia.services.usermanager.JahiaUserManagerService;
import org.jahia.settings.SettingsBean;
import org.jahia.utils.LanguageCodeConverters;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Component(service = { javax.servlet.http.HttpServlet.class, javax.servlet.Servlet.class }, property = { "alias=/moonstone",
        "jmx.objectname=graphql.servlet:type=root", "osgi.http.whiteboard.servlet.asyncSupported=true" })
public class Main extends HttpServlet {
    private static final String $_UI_LANG = "$ui-lang(";
    private static final String SITE_SERVERNAME = "$site-servername";
    private static Logger logger = LoggerFactory.getLogger(Main.class);

    @Override protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            SettingsBean settingsBean = SettingsBean.getInstance();
            JahiaUser currentUser = JCRSessionFactory.getInstance().getCurrentUser();
            Locale locale;
            if (!JahiaUserManagerService.isGuest(currentUser)) {
                JCRUserNode userNode = JahiaUserManagerService.getInstance().lookupUserByPath(currentUser.getLocalPath());
                locale = UserPreferencesHelper.getPreferredLocale(userNode, LanguageCodeConverters.resolveLocaleForGuest(request));
            } else {
                locale = LanguageCodeConverters.resolveLocaleForGuest(request);
            }
            JCRSessionWrapper currentUserSession = JCRSessionFactory.getInstance().getCurrentUserSession(Constants.EDIT_WORKSPACE, locale);
            HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request) {
                @Override public String getContextPath() {
                    return Jahia.getContextPath();
                }
            };
            RenderContext context = new RenderContext(wrapper, response, currentUser);
            JCRNodeWrapper node = currentUserSession.getNode("/");
            Resource resource = new Resource(node, null, null, null);
            context.setMainResource(resource);
            context.setForceUILocaleForJCRSession(true);
            context.setEditMode(true);
            wrapper.setAttribute("renderContext", context);
            wrapper.setAttribute("contextPath", Jahia.getContextPath());
            wrapper.setAttribute("currentResource", resource);
            wrapper.setAttribute("currentUser", currentUser);
            wrapper.setAttribute("userEmail", currentUser.getProperty("j:email"));
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("documentation", settingsBean.getString("documentation.link", "https://academy.jahia.com/documentation/"));
            boolean isWhatsNewDisplayable = Boolean.parseBoolean(settingsBean.getString("whatsNew.display", "true"));
            if (isWhatsNewDisplayable) {
                jsonObject.put("whatsNew", replacePlaceholders(settingsBean.getString("whatsNew.link", ""), context, locale));
            } else {
                jsonObject.put("whatsNew", "https://academy.jahia.com/whats-new");
            }
            wrapper.setAttribute("links", jsonObject.toString());
            wrapper.setAttribute("environment", settingsBean.getString("jahia.environment", "Test environment"));
            wrapper.getRequestDispatcher("/modules/jahia-ui-root/root.jsp").include(wrapper, response);
        } catch (Exception e) {
            logger.error("Error while dispatching: {}", e.getMessage(), e);
        }
    }

    static String replacePlaceholders(String value, RenderContext renderContext, Locale locale) {
        if (value.contains(SITE_SERVERNAME) && renderContext.getSite() != null) {
            try {
                value = value.replace(SITE_SERVERNAME, ((String) renderContext.getSite().getProperty("j:serverName").getString()));
            } catch (RepositoryException e) {
                value = value.replace(SITE_SERVERNAME, "");
            }
        }
        if (value.contains($_UI_LANG)) {
            value = handleUILang(value, locale);
        }
        if (value.contains("$dx-version")) {
            value = value.replace("$dx-version", Jahia.VERSION);
        }
        return value;
    }

    private static String handleUILang(String value, Locale locale) {
        // handle pattern like: $uiLang([fr,en],en)
        int uiLangIndex = value.indexOf($_UI_LANG);
        int startLangIndex = uiLangIndex + $_UI_LANG.length();
        int endLangIndex = value.indexOf(')', startLangIndex);

        String paramStr = value.substring(startLangIndex, endLangIndex);
        String[] params = paramStr.split(",");

        Set<String> acceptedLangs = new HashSet<>();
        String defaultLang = params[params.length - 1].trim();

        for (int i = 0; i < (params.length - 1); i++) {
            String param = params[i].trim();
            if (param.startsWith("[")) {
                param = param.substring(1);
            }
            if (param.endsWith("]")) {
                param = param.substring(0, param.length() - 1);
            }
            acceptedLangs.add(param);
        }

        String finalLang = acceptedLangs.contains(locale.toString()) ? locale.toString() : defaultLang;
        value = value.replace(value.substring(uiLangIndex, endLangIndex + 1), finalLang);
        return value;
    }
}
