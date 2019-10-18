import React from 'react';
import {registry} from '@jahia/registry';
import {LayoutModule, Typography} from '@jahia/moonstone'

export const TestWithNav = () => {
    return (
        <LayoutModule
            navigation={
                <div style={{backgroundColor: 'light-grey', height: '100%', width: '100%'}}>
                    <Typography variant="page">NAV2</Typography>
                </div>
            }
            content={
                <div style={{backgroundColor: 'yellow', height: '100%', width: '100%'}}>
                    <Typography variant="page">CONTENT1</Typography>
                </div>

            }
        />
    );
};

