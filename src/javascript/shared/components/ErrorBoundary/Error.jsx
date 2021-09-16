import React from 'react';
import {Button, Reload, Typography} from '@jahia/moonstone';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import styles from './Error.scss';
import clsx from 'clsx';

export const Error = ({error, reset}) => {
    const {t} = useTranslation('jahia-ui-root');
    return (
        <div className={styles.pageError}>
            <div className={clsx(styles['pageError-wrapper'], 'flexCol', 'alignCenter')}>
                <Typography component="h1" variant="title" weight="bold" className={styles['pageError-title']}>{t('error.label')}</Typography>
                <Typography variant="subtitle" className={styles['pageError-description']}>{t('error.subtitle')}</Typography>
                <Button icon={<Reload/>} size="big" label={t('error.retry')} color="accent" className={styles['pageError-button']} onClick={reset}/>
                <pre className={styles['pageError-log']}>
                    {error.stack}
                </pre>
            </div>
        </div>
    );
};

Error.propTypes = {
    error: PropTypes.string,
    reset: PropTypes.func
};
