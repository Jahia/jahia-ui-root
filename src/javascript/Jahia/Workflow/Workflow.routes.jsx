import React from 'react';
import {registry} from '@jahia/ui-extender';
import {useHistory} from 'react-router-dom';
import {PrimaryNavItem} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import Workflow from '@jahia/moonstone/dist/icons/Workflow';
import WorkflowComponent from './Workflow';

const PATH = '/workflow';

export const WorkflowGroup = () => {
    const {t} = useTranslation();
    const history = useHistory();

    return (
        <PrimaryNavItem
            isSelected={history.location.pathname.startsWith(PATH)}
            icon={<Workflow/>}
            label={t('jahia-ui-root:primaryNavigation.workflow.label')}
            onClick={() => history.push(PATH)}/>
    );
};

registry.add('workflowGroup', 'workflowNavGroup', {
    targets: ['nav-root-workflow:1'],
    render: () => <WorkflowGroup key="workflowGroup"/>
});

// Register wiokrflow component
registry.add('route', 'workflow', {
    targets: ['nav-root-top'],
    path: PATH,
    defaultPath: PATH,
    render: () => <WorkflowComponent/>
});
