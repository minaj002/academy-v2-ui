/**
 * Created by artis on 29/03/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import { loginUser } from '../../actions/auth';
import { setTitle } from '../../actions';

import './login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentWillMount() {
        this.props.dispatch(setTitle("Login"));
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    handleSubmit = (user) => {
        const creds = { username: user.username.trim(), password: user.password.trim() };
        this.props.dispatch(loginUser(creds));
    };

    render() {

        return (
            <LoginForm errorMessage={this.props.errorMessage} isFetching={this.props.isFetching} onSubmit={this.handleSubmit} />
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps) (Login);
