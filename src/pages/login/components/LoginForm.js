/**
 * Created by artis on 30/03/2017.
 */

import React from 'react';
import Card, {CardActions} from 'material-ui/Card';
import {reduxForm, Field} from 'redux-form';
import LockIcon from 'material-ui/svg-icons/action/lock';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import InputTextField from '../../../components/InputTextField';


const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = "Username is required"
    }
    if (!values.password) {
        errors.password = "Password is required"
    }

    return errors;
};

const LoginForm = props =>  {

    const { handleSubmit, pristine, submitting, errorMessage, isFetching } = props;

    return (
        <div id="login-form">
            <Card className="card">
                <div className="avatar">
                    <Avatar icon={<LockIcon />} size={60} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form">

                        {errorMessage &&
                        <p className="error-message">{errorMessage}</p>
                        }

                        <div className="field" >
                            <Field name="username" component={InputTextField}
                                   label="Username" />
                        </div>
                        <div className="field">
                            <Field name="password" type="password" component={InputTextField} label="Password" />
                        </div>
                    </div>
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
                </form>
            </Card>
        </div>
    );

};

/*LoginForm.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};*/

export default reduxForm({
    form: 'login',
    validate,
})(LoginForm)