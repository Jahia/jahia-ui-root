import React from 'react';
import styles from './Error.scss';
import {ErrorLayout} from './ErrorLayout';
import {useTranslation} from 'react-i18next';

export const Error404 = props => {
    const {t} = useTranslation('jahia-ui-root');
    return (
        <ErrorLayout title={t('error.error404.label')}
                     subtitles={[t('error.error404.subtitle1'), t('error.error404.subtitle2')]}
                     className={styles.page404}
                     {...props}
        />
    );
};

Error404.propTypes = {
};

