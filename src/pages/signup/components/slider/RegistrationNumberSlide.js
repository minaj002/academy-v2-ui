/**
 * Created by artis on 19/07/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
    const errors = {};
    if (!values.registrationNumber) {
        errors.registrationNumber = "Registration number is required"
    }
    else if (!/^[a-z0-9]+$/i.test(values.registrationNumber)) {
        errors.registrationNumber = "Registration number is not valid"
    }

    return errors;
};

class RegistrationNumberSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your registration number?</div>

                <div className="signup-field-group">
                    <Field name="registrationNumber" hintText="e.g 123456789" component={TextField} fullWidth tabIndex="-1" />
                </div>
                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>


        );
    }
}

RegistrationNumberSlide = reduxForm({
    form: 'RegistrationNumberSlide',
    validate
})(RegistrationNumberSlide);

export default connect() (RegistrationNumberSlide);
