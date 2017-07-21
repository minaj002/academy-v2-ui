/**
 * Created by artis on 29/03/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import { loginUser } from '../../actions/auth';
import { setTitle } from '../../actions';
import LockIcon from 'material-ui/svg-icons/action/lock';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Card, {CardActions} from 'material-ui/Card';

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

        const { errorMessage } = this.props;

        return (
            <div id="login-form">
                <Card className="card">
                    <div className="avatar">
                        <Avatar icon={<LockIcon />} size={60} />
                    </div>

                    {errorMessage &&
                    <p className="error-message">{errorMessage}</p>
                    }

                    <LoginForm errorMessage={this.props.errorMessage} isFetching={this.props.isFetching} onSubmit={this.handleSubmit} />
                    <CardActions>
                        {!isFetching &&
                        <RaisedButton
                            type="submit"
                            primary
                            label="Login"
                            fullWidth
                        />
                        }
                        {isFetching &&
                        <CircularProgress className="circular-progress-40"/>
                        }

                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps) (Login);
