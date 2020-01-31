import React from 'react';
import ReactDOM from 'react-dom';
import Jahia from './Jahia';
import {registry} from '@jahia/ui-extender';

function render() {
    // Init register from callbacks
    registry.find({type: 'callback', target: 'jahiaApp-init'}).forEach(entry => entry.callback());
    ReactDOM.render(<Jahia jahiaCtx={window.contextJsParameters}/>, document.getElementById(window.contextJsParameters.targetId));
}

export {render};
