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

//let countryFromInput;

const validate = (values) => {
    const errors = {};
    if (!values.phone) {
        errors.phone = 'Phone number is required';
    } else {
        if (!isValidNumber(values.phone)) {
            errors.phone = 'Phone number is not valid';
        }
    }
    return errors;
};

class PhoneNumberSlide extends Component {

    componentWillMount() {
        if (this.props.selectedCountry) {
            this.props.change("phone", "+" + getPhoneCode(this.props.selectedCountry) + " ");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedCountry!==nextProps.selectedCountry) {
            this.props.change("phone", "+" + getPhoneCode(nextProps.selectedCountry) + " ");
        }
    }

    onInputChange = (e, value) => {
        let val = new asYouType().input(value);
        this.props.change("phone", val);
        e.preventDefault();
    };

    render() {

        const { handleSubmit, pristine, selectedCountry } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your phone number?</div>

                <div className="signup-field-group">
                    <Field name="phone" ref="phone" withRef
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
