/**
 * Created by artis on 26/06/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col} from 'react-flexbox-grid';
import GooglePlaceAutocomplete from '../GooglePlaceAutoComplete';
import { change } from 'redux-form';

const validate = values => {
    const errors = {};
    if (!values.line1) {
        errors.line1 = "Street is required"
    }

    if (!values.city) {
        errors.city = "City is required"
    }

    if (!values.postalCode) {
        errors.postalCode = "Post code is required"
    }

    return errors;
};

class BusinessAddressSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };

        this._autoCompleteService = new google.maps.places.AutocompleteService();
        this._geocoder = new google.maps.Geocoder();
    }

    onItemSelected = (item) => {
        this.props.dispatch(change('BusinessAddressSlide', 'city', item.city));
        this.props.dispatch(change('BusinessAddressSlide', 'postalCode', item.postalCode));
    };

    render() {

        const { handleSubmit, pristine } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">Where's your company located?</div>

                <div className="signup-field-group">
                    <Row>
                        <Col lg={12}>

                            <Field name="line1" hintText="" floatingLabelText="Street" floatingLabelFixed={true}
                                   onItemSelected = {this.onItemSelected}
                                   component={GooglePlaceAutocomplete}
                                   fullWidth tabIndex="-1" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Field name="city" hintText="" floatingLabelText="City" floatingLabelFixed={true}
                                   component={TextField} fullWidth tabIndex="-1" />
                        </Col>
                        <Col lg={4}>
                            <Field name="postalCode" hintText="" floatingLabelText="Post index" floatingLabelFixed={true}
                                   component={TextField} fullWidth tabIndex="-1" />
                        </Col>
                        {/*<Col lg={4}>
                            <Field name="country" hintText="" floatingLabelText="Country" floatingLabelFixed={true}
                                   disabled
                                   component={TextField} fullWidth tabIndex="-1" />
                        </Col>*/}
                    </Row>

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

BusinessAddressSlide.propTypes = {
   country: PropTypes.string
};

BusinessAddressSlide = reduxForm({
    form: 'BusinessAddressSlide',
    validate
})(BusinessAddressSlide);

export default connect() (BusinessAddressSlide);

