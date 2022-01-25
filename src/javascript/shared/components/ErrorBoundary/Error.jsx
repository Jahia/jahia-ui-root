import React from 'react';
import {Button, Reload} from '@jahia/moonstone';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import styles from './Error.scss';
import {ErrorLayout} from './ErrorLayout';

export const Error = ({error, reset, ...props}) => {
    const {t} = useTranslation('jahia-ui-root');
    return (
        <ErrorLayout title={t('error.error500.label')}
                     subtitles={[t('error.error500.subtitle')]}
                     className={styles.page500}
                     footer={(
                         <>
                             <Button icon={<Reload/>} size="big" label={t('error.error500.retry')} color="accent" className={styles['pageError-button']} onClick={reset}/>
                             <pre className={styles['pageError-log']}>
                                 {error.stack}
                             </pre>
                         </>
                     )}
                     {...props}
        />
    );
};

Error.propTypes = {
    error: PropTypes.string,
    reset: PropTypes.func
};
