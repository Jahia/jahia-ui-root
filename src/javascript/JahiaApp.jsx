import React from 'react';
import ReactDOM from 'react-dom';
import Jahia from './Jahia';
import JahiaError from './JahiaApp.error';
import {registry} from '@jahia/ui-extender';

function render() {
    const container = document.getElementById(window.contextJsParameters.targetId);
    // Init register from callbacks
    const promises = [];
    registry.find({type: 'callback', target: 'jahiaApp-init'}).forEach(entry => promises.push(entry.callback()));
    Promise.all(promises).then(() => {
        ReactDOM.render(<Jahia jahiaCtx={window.contextJsParameters}/>, container);
    }).catch(() => {
        console.error('Encountered error during callback handling:', promises);
        ReactDOM.render(<JahiaError operatingMode={window.contextJsParameters.operatingMode}/>, container);
    });
}

export {render};
