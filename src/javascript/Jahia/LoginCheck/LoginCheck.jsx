import React from 'react';
import {useQuery} from '@apollo/client';
import {GetUserQuery} from './LoginCheck.gql';
import styles from './LoginCheck.scss';
import {Typography} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';

export const LoginCheck = () => {
    const {t} = useTranslation('jahia-ui-root');
    const res = useQuery(GetUserQuery, {
        pollInterval: 10000
    });

    const sessionInvalid = Boolean(res.data && res.data.currentUser.name === 'guest');

    return sessionInvalid && (
        <div className={styles.root}>
            <div className={styles.backdrop}/>
            <div className={styles.modal}>
                <Typography variant="heading">{t('sessionExpiration.title')}</Typography>
                <Typography>
                    {t('sessionExpiration.text')}
                    <br/>
                    {t('sessionExpiration.text2')}
                </Typography>
            </div>
        </div>
    );
};
