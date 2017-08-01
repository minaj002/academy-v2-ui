/**
 * Created by artis on 22/06/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import { asYouType, getPhoneCode, isValidNumber, parse } from 'libphonenumber-js';

let countryFromInput;

const validate = (values) => {

    const errors = {};

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
    } else {
        //let parsed = parse(values.phoneNumber, );
        if (!isValidNumber(values.phoneNumber)) {
            errors.phoneNumber = 'Phone number is not valid';
        }
    }

    return errors;
};

class PhoneNumberSlide extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedCountry!=='' && this.props.selectedCountry!==nextProps.selectedCountry) {
            countryFromInput = nextProps.selectedCountry;
            let number = "+" + getPhoneCode(nextProps.selectedCountry) + " ";
            this.props.change("phoneNumber", number);
        }
    }

    onInputChange = (e, value) => {
        let val = new asYouType().input(value);
        this.props.change("phoneNumber", val);
        e.preventDefault();
    };

    render() {

        const { handleSubmit, pristine, selectedCountry } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your phone number?</div>

                <div className="signup-field-group">
                    <Field name="phoneNumber" ref="phoneNumber" withRef
                           onChange = {this.onInputChange}
                           component={TextField} fullWidth tabIndex="-1" />
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
