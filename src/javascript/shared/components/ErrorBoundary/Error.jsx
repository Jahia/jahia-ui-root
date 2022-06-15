import React from 'react';
import {ArrowLeft, Button, Reload} from '@jahia/moonstone';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import styles from './Error.scss';
import {ErrorLayout} from './ErrorLayout';

export const Error = ({error, reset, goBack, ...props}) => {
    const {t} = useTranslation('jahia-ui-root');
    return (
        <ErrorLayout title={t('error.error500.label')}
                     subtitles={[t('error.error500.subtitle')]}
                     className={styles.page500}
                     footer={(
                         <>
                             <div className={styles['pageError-buttons']}>
                                 <Button icon={<Reload/>}
                                         size="big"
                                         label={t('error.error500.retry')}
                                         color="accent"
                                         className={styles['pageError-button']}
                                         onClick={reset}/>
                                 <Button icon={<ArrowLeft/>}
                                         size="big"
                                         label={t('error.back')}
                                         color="default"
                                         className={styles['pageError-button']}
                                         onClick={goBack}/>
                             </div>
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
    reset: PropTypes.func,
    goBack: PropTypes.func
};
