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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

@Component(
        service = {javax.servlet.http.HttpServlet.class, javax.servlet.Servlet.class},
        property = {"alias=/moonstone", "jmx.objectname=graphql.servlet:type=root", "osgi.http.whiteboard.servlet.asyncSupported=true"}
)
public class Main extends HttpServlet {
    private static Logger logger = LoggerFactory.getLogger(Main.class);

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            JahiaUser currentUser = JCRSessionFactory.getInstance().getCurrentUser();
            Locale locale;
            if (!JahiaUserManagerService.isGuest(currentUser)) {
                JCRUserNode userNode = JahiaUserManagerService.getInstance().lookupUserByPath(currentUser.getLocalPath());
                locale = UserPreferencesHelper.getPreferredLocale(userNode, LanguageCodeConverters.resolveLocaleForGuest(request));
            } else {
                locale = LanguageCodeConverters.resolveLocaleForGuest(request);
            }
            JCRSessionWrapper currentUserSession = JCRSessionFactory.getInstance().getCurrentUserSession(Constants.EDIT_WORKSPACE, locale);
            RenderContext context = new RenderContext(request, response, null);
            JCRNodeWrapper node = currentUserSession.getNode("/");
            Resource resource = new Resource(node, null, null, null);
            context.setMainResource(resource);
            context.setForceUILocaleForJCRSession(true);
            context.setEditMode(true);
            request.setAttribute("renderContext", context);
            request.setAttribute("contextPath", Jahia.getContextPath());
            request.setAttribute("currentResource", resource);
            JSONObject jsonObject = new JSONObject();
            SettingsBean settingsBean = SettingsBean.getInstance();
            jsonObject.put("documentation", settingsBean.getString("documentation.link", "https://academy.jahia.com/documentation/"));
            Boolean isWhatsNewDisplayable = Boolean.valueOf(settingsBean.getString("whatsNew.display", "true"));
            jsonObject.put("whatsNew", isWhatsNewDisplayable ? settingsBean.getString("whatsNew.link", "") : "https://academy.jahia.com/whats-new");
            request.setAttribute("links",jsonObject.toString());
            request.getRequestDispatcher("/modules/jahia-ui-root/root.jsp").include(request, response);
        } catch (Exception e) {
            logger.error("Error while dispatching: {}", e.getMessage(), e);
        }
    }
}
