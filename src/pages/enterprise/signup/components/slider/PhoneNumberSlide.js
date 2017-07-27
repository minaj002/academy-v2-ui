/**
 * Created by artis on 22/06/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TelephoneInput from '../../../../../components/fields/phone/withStyles';
import GoogleLibPhoneNumber from 'google-libphonenumber';
import PhoneNumber from '../../../../../components/fields/phoneNumber/PhoneNumber';

let countryFromInput;
const PhoneNumberUtil = GoogleLibPhoneNumber.PhoneNumberUtil.getInstance();

const validate = (values) => {

    const errors = {};

    /*if (countryFromInput) {
        let numberProto;
        try {
            numberProto = PhoneNumberUtil.parse(values.phoneNumber, countryFromInput.iso2);
            if (!PhoneNumberUtil.isValidNumber(numberProto)) {
                errors.phoneNumber = "Please input phone number correctly";
            }

        } catch (e) {
            errors.phoneNumber = "Please input phone number correctly";

        }
    }*/

    return errors;
};

class PhoneNumberSlide extends Component {

    componentWillMount() {
        countryFromInput = this.props.selectedCountry;
    }

    /*onInputChange = (number, country) => {
        countryFromInput = country;
    };*/

    /*shouldComponentUpdate(nextProps, nextState) {
        return nextProps.selectedCountry !== this.props.selectedCountry;
    }*/

    render() {

        const { handleSubmit, pristine, selectedCountry } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your phone number?</div>

                <div className="signup-field-group">
                    <Field name="phoneNumber"
                           //onInputChange={this.onInputChange}
                           component={PhoneNumber} fullWidth tabIndex="-1" />
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

PhoneNumberSlide.propTypes = {
    selectedCountry: PropTypes.string.isRequired
};

PhoneNumberSlide = reduxForm({
    form: 'PhoneNumberSlide',
    validate
})(PhoneNumberSlide);

export default connect() (PhoneNumberSlide);
