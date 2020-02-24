import React from 'react';
import {registry} from '@jahia/ui-extender';
import {useHistory} from 'react-router-dom';
import {PrimaryNavItem, Badge} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-apollo';
import WorkflowIcon from '@jahia/moonstone/dist/icons/Workflow';
import Workflow from './Workflow';
import {NumberOfWorkflowsQuery} from './Workflow.gql-querys';
const PATH = '/workflow';

const POLL_INTERVAL = 10000; // 10 seconds

export const WorkflowGroup = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const {data, loading} = useQuery(NumberOfWorkflowsQuery, {
        pollInterval: POLL_INTERVAL
    });

    if (loading) {
        return null;
    }

    const badge = data.jcr.activeWorkflowTaskCountForUser > 0 ? (
        <Badge
        type="round"
        color="danger"
        label={data.jcr.activeWorkflowTaskCountForUser}
    />
    ) : null;

    return (
        <PrimaryNavItem
            badge={badge}
            isSelected={history.location.pathname.startsWith(PATH)}
            icon={<WorkflowIcon/>}
            label={t('jahia-ui-root:primaryNavigation.workflow.label')}
            onClick={() => history.push(PATH)}/>
    );
};

registry.add('primary-nav-item', 'workflowNavGroup', {
    targets: ['nav-root-tasks:1'],
    render: () => <WorkflowGroup key="workflowGroup"/>
});

// Register wiokrflow component
registry.add('route', 'workflow', {
    targets: ['nav-root-top'],
    path: PATH,
    defaultPath: PATH,
    render: () => <Workflow/>
});
