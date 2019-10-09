import React from 'react';
import ReactDOM from 'react-dom';
import Jahia from './Jahia';

function render() {
    ReactDOM.render(<Jahia/>, document.getElementById(window.contextJsParameters.targetId));
}

window.onload = render;