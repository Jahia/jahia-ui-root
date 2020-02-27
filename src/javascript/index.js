import {registry} from '@jahia/ui-extender';

registry.add('callback', 'jahiaUiRoot', {
    targets: ['jahiaApp-init:99'],
    callback: () => import('./JahiaApp.register')
});
