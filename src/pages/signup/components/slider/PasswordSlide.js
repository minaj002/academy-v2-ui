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
        errors.password = "Password is required"
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
