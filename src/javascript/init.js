import {registry} from "@jahia/ui-extender";
import register from './JahiaUiRoot.register';

export default function() {
    registry.add('callback', 'jahiaUiRoot', {
        targets: ['jahiaApp-init:80'],
        callback: register
    });
};
