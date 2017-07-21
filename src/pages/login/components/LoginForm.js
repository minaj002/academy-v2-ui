/**
 * Created by artis on 30/03/2017.
 */

import React from 'react';
import {reduxForm, Field} from 'redux-form';
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

    const { handleSubmit, pristine } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form">

                <div className="field" >
                    <Field name="username" component={InputTextField}
                           label="Username" />
                </div>
                <div className="field">
                    <Field name="password" type="password" component={InputTextField} label="Password" />
                </div>
            </div>
        </form>
    );

};

export default reduxForm({
    form: 'login',
    validate,
})(LoginForm)