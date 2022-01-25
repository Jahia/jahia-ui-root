import React from 'react';
import {Typography} from '@jahia/moonstone';
import PropTypes from 'prop-types';
import styles from './Error.scss';
import clsx from 'clsx';

export const ErrorLayout = ({title, subtitles, footer, className}) => {
    return (
        <div className={clsx(styles.pageError, className)}>
            <div className={clsx(styles['pageError-wrapper'], 'flexCol_center', 'alignCenter')}>
                <Typography component="h1" variant="title" weight="bold" className={styles['pageError-title']}>{title}</Typography>
                {subtitles.map(subtitle => <Typography key={subtitle} variant="subtitle" className={styles['pageError-description']}>{subtitle}</Typography>)}
                {footer}
            </div>
        </div>
    );
};

ErrorLayout.propTypes = {
    title: PropTypes.string,
    subtitles: PropTypes.arrayOf(PropTypes.string),
    footer: PropTypes.node,
    className: PropTypes.string
};
