import {registry} from '@jahia/ui-extender';

// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = window.contextJsParameters.contextPath + '/modules/jahia-ui-root/javascript/apps/';

registry.add('callback', 'jahiaUiRoot', {
    targets: ['jahiaApp-init:99'],
    callback: () => {
        return Promise.all([
            import('./JahiaUiRoot.register'),
            window.jahia.i18n.loadNamespaces('jahia-ui-root')
        ]);
    }
});
