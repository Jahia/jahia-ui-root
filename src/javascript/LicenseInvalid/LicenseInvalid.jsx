import React from 'react';
import {Typography} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import styles from './LicenseInvalid.scss';
import JahiaLogo from '../JahiaLogo';

export const LicenseInvalid = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.root}>
            <JahiaLogo height="6rem" width="24rem"/>
            <Typography variant="title">{t('jahia-ui-root:licenceTermsViolation.title')}</Typography>
            <Typography variant="subheading">{t('jahia-ui-root:licenceTermsViolation.text')}</Typography>
        </div>
    );
};
