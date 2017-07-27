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
import GooglePlaceAutocomplete from '../../../../../components/fields/GooglePlaceAutoComplete';
import { change } from 'redux-form';
import countries from '../../../../../data/countries.json';

const validate = values => {
    const errors = {};

    /*if (values.address) {
        if (!values.address.line1) {
            errors.address.line1 = "Street is required"
        }

        if (!values.address.city) {
            errors.address.city = "City is required"
        }

        if (!values.address.postalCode) {
            errors.address.postalCode = "Post code is required"
        }
    }*/

    return errors;
};

/*function getCountry(countryCode) {
    for (let c of countries) {
        if (c.alpha2Code===countryCode) {
            return c;
        }
    }

    return null;
}*/

class BusinessAddressSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: {}
        };
    }

    /*componentDidMount() {
        const country = getCountry(this.props.country);
        this.props.initialize({
            "address.country": country.alpha2Code
        });

        this.setState({country: country});
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.country && this.props.country!==nextProps.country) {
            const country = getCountry(nextProps.country);
            this.setState({country: country});
            this.props.dispatch(change('BusinessAddressSlide', 'address.country', country.alpha2Code));
        }
    }*/

    onItemSelected = (item) => {
        this.props.dispatch(change('BusinessAddressSlide', 'address.line1', item.line1));
        this.props.dispatch(change('BusinessAddressSlide', 'address.city', item.city));
        this.props.dispatch(change('BusinessAddressSlide', 'address.postalCode', item.postalCode));
        //const address = Object.assign(this.state.address, item);
    };

    render() {

        const { handleSubmit, pristine } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">Where's your company located?</div>

                <div className="signup-field-group">
                    <Row>
                        <Col lg={12}>

                            <Field name="address.line1" hintText="" floatingLabelText="Street" floatingLabelFixed={true}
                                   onItemSelected = {this.onItemSelected}
                                   country={this.props.country}
                                   component={GooglePlaceAutocomplete}
                                   fullWidth tabIndex="-1" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Field name="address.city" hintText="" floatingLabelText="City" floatingLabelFixed={true}
                                   component={TextField} fullWidth tabIndex="-1" />
                        </Col>
                        <Col lg={4}>
                            <Field name="address.postalCode" hintText="" floatingLabelText="Postal code" floatingLabelFixed={true}
                                   component={TextField} fullWidth tabIndex="-1" />
                        </Col>
                        {/*<Col lg={4}>
                            <Field name="address.country" hintText={this.state.country.name} floatingLabelText="Country" floatingLabelFixed={true}
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

