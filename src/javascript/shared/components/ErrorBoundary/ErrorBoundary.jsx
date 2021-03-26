import React from 'react';
import PropTypes from 'prop-types';
import {Error} from './Error';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {error};
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.error) {
            return React.cloneElement(this.props.fallback, {error: this.state.error, reset: () => this.setState({error: null})});
        }

        return this.props.children;
    }
}

ErrorBoundary.defaultProps = {
    fallback: <Error/>
};

ErrorBoundary.propTypes = {
    fallback: PropTypes.element,
    children: PropTypes.element
};
