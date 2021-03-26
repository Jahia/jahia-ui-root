import {Loader} from '@jahia/moonstone';
import React from 'react';

export const LoaderOverlay = () => (
    <div className="flexFluid flexCol_center alignCenter" style={{backgroundColor: 'var(--color-light)'}}>
        <Loader size="big"/>
    </div>
);
