import React from 'react';
import {ErrorLayout} from './ErrorLayout';
import {useTranslation} from 'react-i18next';

export const Error503 = props => {
    const {t} = useTranslation('jahia-ui-root');
    return (
        <ErrorLayout title={t('error.error503.label')}
                     subtitles={[t('error.error503.subtitle1'), t('error.error503.subtitle2')]}
                     {...props}
        />
    );
};

Error503.propTypes = {
};

