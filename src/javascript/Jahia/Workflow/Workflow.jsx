import React, {useEffect} from 'react';

let renderWorkflow = function () {
    if (window.authoringApi !== undefined && window.authoringApi.openWorkflow !== undefined) {
        console.log('rendering workflow');
        clearInterval(checkAuthoringApi);
        let elementById = document.getElementById('workflowComponent');
        if (elementById !== null) {
            elementById.lastChild.remove();
            window.authoringApi.openWorkflow('workflowComponent');
        }

        return null;
    }
};

const checkAuthoringApi = setInterval(() => {
    return renderWorkflow();
},
100);

const Workflow = () => {
    useEffect(() => {
        return renderWorkflow();
    }, []);
    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            position: 'fixed'
        }}
             id="workflowComponent"
        >
            <h1>Loading Workflow</h1>
        </div>
    );
};

export default Workflow;
