import React from 'react';
import {Typography, LayoutModule} from '@jahia/moonstone'

export const TestWithoutNav = () => {
    return (
        <LayoutModule
            content={
                <div style={{backgroundColor: 'yellow', height: '100%', width: '100%'}}>
                    <Typography variant="page">CONTENT2</Typography>
                </div>
            }
        />
    );
};
