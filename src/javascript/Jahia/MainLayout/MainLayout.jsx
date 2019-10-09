import PropTypes from 'prop-types';
import React from 'react';

const MainLayout = ({title, children}) => (
    <div style={{flex: '1 1 0%', display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0}}>
        <div>
            <h1>{title}</h1>
        </div>
        <div style={{flex: '1 1 0%', display: 'flex', flexDirection: 'column', minHeight: 0}}>
            {children}
        </div>
    </div>
);

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
};

export default MainLayout;
