import {registry} from '@jahia/ui-extender';

// TODO : registration should be done synchronously so that they are called in callback order
registry.add('callback', 'jahiaUiRoot', {
    targets: ['jahiaApp-init:99'],
    callback: () => import('./JahiaApp.register')
});
