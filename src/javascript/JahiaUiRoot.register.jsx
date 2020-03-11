import {registry} from '@jahia/ui-extender';
import './Jahia/Jahia.routes';
import {jahiaApps} from './JahiaUiRoot.app.register';
import {jahiaRedux} from './JahiaUiRoot.redux.register';

jahiaApps(registry, window.contextJsParameters);
jahiaRedux(registry, window.contextJsParameters);
console.debug('%c jahiaUiRoot is activated', 'color: #3c8cba');
