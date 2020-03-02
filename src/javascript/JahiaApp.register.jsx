import {registry} from '@jahia/ui-extender';
import './Jahia/Jahia.routes';
import './Jahia/PageComposer/PageComposer.routes';
import {jahiaApps} from './Jahia/Jahia.app';
import {jahiaRedux} from './Jahia/Jahia.redux';

jahiaApps(registry, window.contextJsParameters);
jahiaRedux(registry, window.contextJsParameters);
console.debug('%c jahiaUiRoot is activated', 'color: #3c8cba');
