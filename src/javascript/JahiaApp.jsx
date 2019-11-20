import React from 'react';
import ReactDOM from 'react-dom';
import Jahia from './Jahia';

function render() {
    ReactDOM.render(<Jahia jahiaCtx={window.contextJsParameters}/>, document.getElementById(window.contextJsParameters.targetId));
}

export {render};
