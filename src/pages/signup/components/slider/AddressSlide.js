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
//import countries from '../../../../data/countries.json';

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

class AddressSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };

        this._autoCompleteService = new google.maps.places.AutocompleteService();
        this._geocoder = new google.maps.Geocoder();
    }

    /*componentWillReceiveProps(nextProps) {
        if (nextProps.country) {
            this.props.dispatch(change('AddressSlide', 'country', nextProps.country));
        }
    }*/

    onItemSelected = (item) => {
        this.props.dispatch(change('AddressSlide', 'city', item.city));
        this.props.dispatch(change('AddressSlide', 'postIndex', item.postalCode));
    };

    render() {

        const { handleSubmit, pristine } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">Where should we send your card?</div>

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


                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>
        );
    }
}

AddressSlide.propTypes = {
   country: PropTypes.string
};

AddressSlide = reduxForm({
    form: 'AddressSlide',
    validate
})(AddressSlide);

export default connect() (AddressSlide);

