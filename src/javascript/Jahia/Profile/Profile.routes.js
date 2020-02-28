import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, PrimaryNavItem} from '@jahia/moonstone';
import Power from '@jahia/moonstone/dist/icons/Power';
import Person from '@jahia/moonstone/dist/icons/Person';
import {registry} from '@jahia/ui-extender';
import JahiaContext from '../Jahia.context';
import {useHistory} from 'react-router';
import Profile from './Profile';

const ROUTE = '/profile';

export const ProfileGroup = () => {
    const jahiaContext = useContext(JahiaContext);
    const history = useHistory();
    const {t} = useTranslation();
    let button = (
        <Button isReversed
                icon={<Power/>}
                variant="ghost"
                label={t('jahia-ui-root:primaryNavigation.profile.signOut')}
                onClick={() => {
                    let url = jahiaContext.contextPath + '/cms/logout?redirect=' + jahiaContext.contextPath + '/start';
                    window.location.assign(url);
                }}/>
    );
    return (
        <PrimaryNavItem icon={<Person/>}
                        subtitle={`${jahiaContext.user.fullname} (${jahiaContext.user.email})`}
                        label={t('jahia-ui-root:primaryNavigation.profile.label')}
                        button={button}
                        isSelected={history.location.pathname.startsWith(ROUTE)}
                        onClick={() => history.push(ROUTE)}/>
    );
};

registry.add('primary-nav-item', 'bottomProfileNavGroup', {
    targets: ['nav-root-profile:1'],
    render: () => <ProfileGroup/>
});

registry.add('route', 'profile', {
    targets: ['nav-root-top'],
    path: ROUTE,
    defaultPath: ROUTE,
    render: () => <Profile/>
});
