import React, { Component } from 'react';

export function requiresAuth(WrappedComponent, isAuthenticated) {
    return class extends Component {

        componentWillMount() {
            if (!isAuthenticated) {
                this.props.history.push("/login");
            }
        }

        render() {

            const {...passThroughProps } = this.props;


            return (
                <WrappedComponent {...passThroughProps} />
            );
        }

    }
}