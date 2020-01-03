package org.jahia.modules.jahiaui.taglib;

import org.apache.commons.lang.StringUtils;
import org.jahia.data.templates.JahiaTemplatesPackage;
import org.jahia.osgi.BundleUtils;
import org.jahia.osgi.FrameworkService;
import org.jahia.services.templates.JahiaTemplateManagerService;
import org.osgi.framework.Bundle;

import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;
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
