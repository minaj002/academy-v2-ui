/**
 * Created by artis on 22/06/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TelephoneInput from './../phoneInput/withStyles';
import GoogleLibPhoneNumber from 'google-libphonenumber';

let selectedCountry;
const PhoneNumberUtil = GoogleLibPhoneNumber.PhoneNumberUtil.getInstance();

const validate = (values) => {

    const errors = {};

    if (selectedCountry) {
        let numberProto;
        try {
            numberProto = PhoneNumberUtil.parse(values.phoneNumber, selectedCountry.iso2);
            if (!PhoneNumberUtil.isValidNumber(numberProto)) {
                errors.phoneNumber = "Please input phone number correctly";
            }

        } catch (e) {
            errors.phoneNumber = "Please input phone number correctly";

        }
    }

    return errors;
};

class PhoneNumberSlide extends Component {

    constructor(props) {
        super(props);
    }

    onInputChange = (number, country) => {
        selectedCountry = country;
    };

    render() {

        const { handleSubmit, pristine, defaultCountry } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your phone number?</div>

                <Field name="phoneNumber"
                       flagsImagePath="/public/assets/img/flags.png"
                       defaultCountry={defaultCountry ? defaultCountry : 'de'}
                       onInputChange={this.onInputChange}
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

PhoneNumberSlide.propTypes = {
    defaultCountry: PropTypes.string.isRequired
};

PhoneNumberSlide = reduxForm({
    form: 'PhoneNumberSlide',
    validate
})(PhoneNumberSlide);

export default connect() (PhoneNumberSlide);
