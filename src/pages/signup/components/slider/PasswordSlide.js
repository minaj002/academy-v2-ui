/**
 * Created by artis on 21/06/2017.
 */


import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = "Password is required";
    }
    else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/.test(values.password)) {
        errors.password = "Password must contain at least one latin uppercase, lowercase and numeric character";
    }
    else if (values.password.length<8 || values.password.length>20) {
        errors.password = 'Password length must between 8 and 20 characters';
    }

    return errors;
};

class PasswordSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">Create your password</div>

                <Field name="password" type="password" hintText="********" component={TextField} fullWidth tabIndex="-1" />

                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>

        );
    }
}

PasswordSlide = reduxForm({
    form: 'PasswordSlide',
    validate
})(PasswordSlide);

export default connect() (PasswordSlide);
