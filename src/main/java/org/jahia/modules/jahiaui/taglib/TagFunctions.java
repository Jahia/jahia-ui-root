package org.jahia.modules.jahiaui.taglib;

import org.apache.commons.lang.StringUtils;
import org.jahia.data.templates.JahiaTemplatesPackage;
import org.jahia.modules.jahiaui.taglib.actionlists.ActionListRenderer;
import org.jahia.osgi.BundleUtils;
import org.jahia.osgi.FrameworkService;
import org.jahia.services.SpringContextSingleton;
import org.jahia.services.render.RenderContext;
import org.jahia.services.templates.JahiaTemplateManagerService;
import org.osgi.framework.Bundle;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Tag functions for Jahia UI Root project
 */
public class TagFunctions {

    /**
     * Retrieves a list of namespaces (module names) that contain JavaScript locales.
     *
     * @return a string representation of an array with all i18n namespaces
     */
    public static String getI18nNameSpaces() {
        Collection<Bundle> bundles = Arrays.stream(FrameworkService.getBundleContext().getBundles())
                .filter(bundle -> bundle.getState() == Bundle.ACTIVE && BundleUtils.isJahiaModuleBundle(bundle))
                .collect(Collectors.toList());
        Set<String> namespaces = new LinkedHashSet<>();
        JahiaTemplateManagerService jtms = BundleUtils.getOsgiService(JahiaTemplateManagerService.class, null);

        for (Bundle bundle : bundles) {
            if (dependsOnJahiaUIRoot(jtms, bundle.getHeaders().get("Bundle-Name")) && bundle.getEntry("/javascript/locales") != null) {
                namespaces.add(BundleUtils.getModuleId(bundle));
            }
        }

        return namespaces.isEmpty() ? "[]" : "['" + StringUtils.join(namespaces, "', '") + "']";
    }

    /**
     * Generates the list of actions for the Content and Media Manager.
     *
     * @param renderContext current render context
     * @return a string representation of the JavaScript resources for action lists
     */
    public static String generateActionLists(RenderContext renderContext) {
        StringBuilder result = new StringBuilder();
        List<ActionListRenderer> actionListRenderers = getActionListRenderers();

        for (ActionListRenderer actionListRenderer : actionListRenderers) {
            result.append(actionListRenderer.renderActionList(renderContext));
        }

        return result.toString();
    }

    @SuppressWarnings("unchecked")
    private static List<ActionListRenderer> getActionListRenderers() {
        if (SpringContextSingleton.getInstance().isInitialized()) {
            return (List<ActionListRenderer>) SpringContextSingleton
                    .getBeanInModulesContext("org.jahia.modules.jahiauiroot.actionListRenderers");
        }
        return Collections.emptyList();
    }

    private static boolean dependsOnJahiaUIRoot(JahiaTemplateManagerService jtms, String bundleName) {
        if (jtms == null) return false;

        JahiaTemplatesPackage pack = jtms.getTemplatePackage(bundleName);

        if (pack == null) return false;

        for (JahiaTemplatesPackage dependency : pack.getDependencies()) {
            if (dependency.getId().equals("jahia-ui-root")) {
                return true;
            }
        }

        return false;
    }
}
