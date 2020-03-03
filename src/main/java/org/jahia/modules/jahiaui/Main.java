package org.jahia.modules.jahiaui;

import org.apache.commons.lang.StringUtils;
import org.apache.taglibs.standard.tag.common.core.Util;
import org.jahia.api.Constants;
import org.jahia.bin.Jahia;
import org.jahia.exceptions.JahiaException;
import org.jahia.registries.ServicesRegistry;
import org.jahia.services.content.JCRCallback;
import org.jahia.services.content.JCRSessionFactory;
import org.jahia.services.content.JCRSessionWrapper;
import org.jahia.services.content.JCRTemplate;
import org.jahia.services.content.decorator.JCRSiteNode;
import org.jahia.services.content.decorator.JCRUserNode;
import org.jahia.services.preferences.user.UserPreferencesHelper;
import org.jahia.services.render.RenderContext;
import org.jahia.services.render.Resource;
import org.jahia.services.sites.JahiaSitesService;
import org.jahia.services.usermanager.JahiaUser;
import org.jahia.services.usermanager.JahiaUserManagerService;
import org.jahia.settings.SettingsBean;
import org.jahia.utils.LanguageCodeConverters;
import org.jahia.utils.Url;
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
import java.util.*;

@Component(service = { javax.servlet.http.HttpServlet.class, javax.servlet.Servlet.class }, property = { "alias=/moonstone",
        "jmx.objectname=graphql.servlet:type=root", "osgi.http.whiteboard.servlet.asyncSupported=true" }) public class Main
        extends HttpServlet {
    private static final String $_UI_LANG = "$ui-lang(";
    private static final String SITE_SERVERNAME = "$site-servername";
    private static Logger logger = LoggerFactory.getLogger(Main.class);

    @Override protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            SettingsBean settingsBean = SettingsBean.getInstance();
            JCRSessionFactory jcrSessionFactory = JCRSessionFactory.getInstance();
            JahiaUser currentUser = jcrSessionFactory.getCurrentUser();
            Locale uiLocale;
            JCRUserNode userNode;
            if (!JahiaUserManagerService.isGuest(currentUser)) {
                userNode = JahiaUserManagerService.getInstance().lookupUserByPath(currentUser.getLocalPath());
                uiLocale = UserPreferencesHelper.getPreferredLocale(userNode, LanguageCodeConverters.resolveLocaleForGuest(request));
            } else {
                response.sendRedirect(Jahia.getContextPath() + "/cms/login?redirect=" + request.getRequestURI());
                return;
            }
            JCRSessionWrapper currentUserSession = jcrSessionFactory
                    .getCurrentUserSession(Constants.EDIT_WORKSPACE, uiLocale, settingsBean.getDefaultLocale());
            HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request) {
                @Override public String getContextPath() {
                    return Jahia.getContextPath();
                }
            };
            RenderContext context = new RenderContext(wrapper, response, currentUser);
            JahiaSitesService sitesService = ServicesRegistry.getInstance().getJahiaSitesService();
            JCRSiteNode site;
            String siteKey = !Url.isLocalhost(request.getServerName()) ?
                    sitesService.getSitenameByServerName(request.getServerName()) :
                    null;
            if (siteKey != null) {
                // site resolved by the hostname -> read it with user session to check the access rights
                site = sitesService.getSiteByKey(siteKey, currentUserSession);
            } else {
                // use the default site
                site = (JCRSiteNode) sitesService.getDefaultSite(currentUserSession);
                if (site == null) {
                    site = sitesService.getSiteByKey("systemsite", currentUserSession);
                }
            }
            String language = resolveLanguage(request, site, userNode, false);
            currentUserSession = jcrSessionFactory
                    .getCurrentUserSession(Constants.EDIT_WORKSPACE, LanguageCodeConverters.languageCodeToLocale(language));
            site = (JCRSiteNode) currentUserSession.getNode(site.getJCRLocalPath());
            Resource resource = new Resource(site, null, null, null);
            context.setMainResource(resource);
            context.setForceUILocaleForJCRSession(true);
            context.setEditMode(true);
            context.setSite(site);
            wrapper.setAttribute("renderContext", context);
            wrapper.setAttribute("contextPath", Jahia.getContextPath());
            wrapper.setAttribute("currentResource", resource);
            wrapper.setAttribute("currentUser", currentUser);
            wrapper.setAttribute("userEmail", currentUser.getProperty("j:email"));
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("documentation", settingsBean.getString("documentation.link", "https://academy.jahia.com/documentation/"));
            boolean isWhatsNewDisplayable = Boolean.parseBoolean(settingsBean.getString("whatsNew.display", "true"));
            if (isWhatsNewDisplayable) {
                jsonObject.put("whatsNew", replacePlaceholders(settingsBean.getString("whatsNew.link", ""), context, uiLocale));
            } else {
                jsonObject.put("whatsNew", "https://academy.jahia.com/whats-new");
            }
            wrapper.setAttribute("links", jsonObject.toString());
            wrapper.setAttribute("environment", settingsBean.getString("jahia.environment", ""));
            response.setHeader("Cache-Control", "no-store");
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

    protected String resolveLanguage(HttpServletRequest request, final JCRSiteNode site, JCRUserNode user, boolean userRedirect)
            throws JahiaException {
        List<Locale> siteLanguages = null;
        if (!userRedirect && site != null && !JahiaSitesService.SYSTEM_SITE_KEY.equals(site.getSiteKey())) {
            try {
                siteLanguages = site.getActiveLiveLanguagesAsLocales();
            } catch (Exception t) {
                logger.debug("Exception while getting language settings as locales", t);
                siteLanguages = Collections.emptyList();
            }
        }

        // first we will check the preferred user locale (if it is among the
        Locale preferredLocale = UserPreferencesHelper.getPreferredLocale(user);
        if (preferredLocale != null && isLocaleSupported(site, siteLanguages, preferredLocale)) {
            return preferredLocale.toString();
        }

        // retrieve the browser locales, but if Accept-Language header is missing we won't fallback to the default system locale
        for (Enumeration<?> requestLocales = Util.getRequestLocales(request); requestLocales.hasMoreElements(); ) {
            final Locale curLocale = (Locale) requestLocales.nextElement();
            if (curLocale != null) {
                // check that the site contains the language and the home page exists in live for that language
                if (isLocaleSupported(site, siteLanguages, curLocale)) {
                    return curLocale.toString();
                }
                if (!StringUtils.isEmpty(curLocale.getCountry())) {
                    // check the same but for language only
                    final Locale langOnlyLocale = LanguageCodeConverters.languageCodeToLocale(curLocale.getLanguage());
                    if (isLocaleSupported(site, siteLanguages, langOnlyLocale)) {
                        return langOnlyLocale.toString();
                    }
                }
            }
        }

        String lang = site.getDefaultLanguage();
        if (lang != null) {
            // use site's default language
            return lang;
        }

        // nothing matches -> fallback to default
        return StringUtils.defaultIfEmpty(SettingsBean.getInstance().getDefaultLanguageCode(), Locale.ENGLISH.toString());
    }

    private boolean isLocaleSupported(JCRSiteNode site, List<Locale> siteLanguages, Locale locale) {
        return (site != null && site.isAllowsUnlistedLanguages()) || siteLanguages == null
                || siteLanguages.contains(locale) && ensureHomePageExists(site, locale);
    }

    private boolean ensureHomePageExists(final JCRSiteNode site, final Locale curLocale) {
        try {
            return JCRTemplate.getInstance()
                    .doExecuteWithSystemSessionAsUser(null, Constants.LIVE_WORKSPACE, curLocale, new JCRCallback<Boolean>() {
                        public Boolean doInJCR(JCRSessionWrapper session) throws RepositoryException {
                            try {
                                JCRSiteNode nodeByIdentifier = (JCRSiteNode) session.getNodeByIdentifier(site.getIdentifier());
                                return nodeByIdentifier.getHome() != null;
                            } catch (RepositoryException e) {
                                if (logger.isDebugEnabled()) {
                                    logger.debug("This site does not have a published home in language " + curLocale, e);
                                }
                            }
                            return Boolean.FALSE;
                        }
                    });
        } catch (RepositoryException e) {
            logger.error(e.getMessage(), e);
        }
        return false;
    }
}
