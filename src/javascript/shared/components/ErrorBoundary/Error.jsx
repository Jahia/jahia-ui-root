import React from 'react';
import {Button, Typography, Warning} from '@jahia/moonstone';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

export const Error = ({error, reset}) => {
    const {t} = useTranslation('jahia-ui-root');
    return (
        <div className="flexFluid alignCenter flexCol_center" style={{backgroundColor: 'var(--color-light)'}}>
            <div className="alignCenter flexRow_center" style={{padding: 'var(--spacing-small)'}}>
                <Warning size="big"/>
                &nbsp;
                <Typography variant="title">{t('error.label')}</Typography>
            </div>
            {contextJsParameters.config.operatingMode === 'development' && (
                <pre style={{
                    maxHeight: '50%',
                    maxWidth: '80%',
                    padding: 'var(--spacing-small)',
                    margin: 'var(--spacing-small)',
                    overflow: 'auto',
                    border: '1px solid red',
                    fontFamily: 'Consolas,monospace'
                }}
                >
                    {error.stack}
                </pre>
            )}
            <Button label={t('error.retry')} color="accent" size="big" onClick={reset}/>
        </div>
    );
};

Error.propTypes = {
    error: PropTypes.string,
    reset: PropTypes.func
};
