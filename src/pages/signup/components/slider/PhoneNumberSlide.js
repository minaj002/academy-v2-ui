/**
 * Created by artis on 22/06/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TelephoneInput from './../phoneInput/withStyles';

const validate = values => {
    const errors = {};
    if (!values.phoneNumber) {
        errors.phoneNumber = "Phone number is required"
    }

    return errors;
};

class PhoneNumberSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your phone number?</div>

                <Field name="phoneNumber" hintText="e.g +111 11111111"
                       flagsImagePath="/public/assets/img/flags.png"
                       defaultCountry="lv"
                       component={TelephoneInput} fullWidth tabIndex="-1" />

                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>

        );
    }
}

PhoneNumberSlide = reduxForm({
    form: 'PhoneNumberSlide',
    validate
})(PhoneNumberSlide);

export default connect() (PhoneNumberSlide);
