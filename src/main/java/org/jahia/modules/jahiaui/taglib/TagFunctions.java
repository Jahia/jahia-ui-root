package org.jahia.modules.jahiaui.taglib;

import org.apache.commons.lang.StringUtils;
import org.jahia.osgi.BundleUtils;
import org.jahia.osgi.FrameworkService;
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
        // TODO Strengthen once module ecosystem is more mature to include only modules that are supposed to work with ui-root
        Collection<Bundle> bundles = Arrays.stream(FrameworkService.getBundleContext().getBundles())
                .filter(bundle -> bundle.getState() == Bundle.ACTIVE && BundleUtils.isJahiaModuleBundle(bundle))
                .collect(Collectors.toList());
        Set<String> namespaces = new LinkedHashSet<>();
        for (Bundle bundle : bundles) {
            if (bundle.getEntry("/javascript/locales") != null) {
                namespaces.add(BundleUtils.getModuleId(bundle));
            }
        }

        return namespaces.isEmpty() ? "[]" : "['" + StringUtils.join(namespaces, "', '") + "']";
    }
}