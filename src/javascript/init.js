import {registry} from "@jahia/ui-extender";

export default function() {
    registry.add('callback', 'jahiaUiRoot', {
        targets: ['jahiaApp-init:80'],
        callback: () => {
            return Promise.all([
                import('./JahiaUiRoot.register'),
                window.jahia.i18n.loadNamespaces('jahia-ui-root')
            ]);
        }
    });
};
