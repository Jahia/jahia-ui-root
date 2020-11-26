import {registry} from '@jahia/ui-extender';
import {jahiaApps} from './JahiaUiRoot.app.register';
import {jahiaRedux} from './JahiaUiRoot.redux.register';
import {jahiaNav} from './JahiaUiRoot.nav.register';
import {jahiaRoutes} from './JahiaUiRoot.routes.register';

jahiaApps(registry, window.contextJsParameters);
jahiaRedux(registry, window.contextJsParameters);
jahiaNav(registry);
jahiaRoutes(registry);
console.info('%c jahiaUiRoot is activated', 'color: #3c8cba');
