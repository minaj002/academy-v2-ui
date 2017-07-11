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

let countryFromInput;
const PhoneNumberUtil = GoogleLibPhoneNumber.PhoneNumberUtil.getInstance();

const validate = (values) => {

    const errors = {};

    if (countryFromInput) {
        let numberProto;
        try {
            numberProto = PhoneNumberUtil.parse(values.phoneNumber, countryFromInput.iso2);
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

    componentWillReceiveProps(nextProps) {
        countryFromInput = nextProps.selectedCountry;
    }

    onInputChange = (number, country) => {
        countryFromInput = country;
    };

    render() {

        const { handleSubmit, pristine, selectedCountry } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your phone number?</div>

                <Field name="phoneNumber"
                       flagsImagePath="/public/assets/img/flags.png"
                       defaultCountry={selectedCountry}
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
    selectedCountry: PropTypes.string.isRequired
};

PhoneNumberSlide = reduxForm({
    form: 'PhoneNumberSlide',
    validate
})(PhoneNumberSlide);

export default connect() (PhoneNumberSlide);
