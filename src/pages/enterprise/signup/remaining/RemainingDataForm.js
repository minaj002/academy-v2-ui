/**
 * Created by artis on 01/08/2017.
 */

import React from 'react';
import { Field } from 'redux-form';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField, AutoComplete } from 'redux-form-material-ui';
import { reduxForm } from 'redux-form';
import {Row, Col} from 'react-flexbox-grid';
import GooglePlaceAutoComplete from '../../../../components/fields/GooglePlaceAutoComplete';
import countries from '../../../../data/countries.json';

const RemainingDataForm = (props) => {

    const onCountryNewRequest = (item) => {

    };

    const onCountryChange = () => {

    };

    const onItemSelected = (item) => {
        props.change("address.line1", item.line1);
        props.change("address.city", item.city);
        props.change("address.postalCode", item.postalCode);
    };


    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Row>
                <Col lg={4}>
                    <Field name="legalName" floatingLabelText="Legal name" component={TextField} fullWidth/>
                </Col>
                <Col lg={4}>
                    <Field name="tradingName" floatingLabelText="Trading name (if different)" component={TextField}
                           fullWidth/>
                </Col>
                <Col lg={4}>
                    <Field name="legalStatus" floatingLabelText="Legal status" component={TextField} fullWidth/>
                </Col>
            </Row>
            <Row>
                <Col lg={3}>

                    <Field name="country" component={AutoComplete} floatingLabelText="Country" maxSearchResults={5}
                           dataSourceConfig={{text: 'name', value: 'alpha2Code'}}
                           dataSource={countries}
                           filter={MUIAutoComplete.caseInsensitiveFilter}
                           onNewRequest={onCountryNewRequest}
                           onUpdateInput={onCountryChange} fullWidth />

                </Col>
                <Col lg={3}>
                    <Field name="address.line1" floatingLabelText="Registered business address"
                           component={GooglePlaceAutoComplete} onItemSelected={onItemSelected} fullWidth/>
                </Col>
                <Col lg={3}>
                    <Field name="address.city" floatingLabelText="City"
                           component={TextField} fullWidth/>
                </Col>
                <Col lg={3}>
                    <Field name="address.postalCode" floatingLabelText="Postal code"
                           component={TextField} fullWidth />
                </Col>

            </Row>

            <Row>

                <Col lg={4}>
                    <Field name="placeOfBusiness" floatingLabelText="Principal Place of Business (if different)"
                           component={TextField} fullWidth />
                </Col>

                <Col lg={4}>
                    <Field name="businessLandlinePhone" floatingLabelText="Business Landline Phone"
                           hintText="Start with country code"
                           component={TextField} fullWidth />
                </Col>

                <Col lg={4}>
                    <Field name="businessMobilePhone" floatingLabelText="Business Mobile Phone "
                           hintText="Start with country code"
                           component={TextField} fullWidth />
                </Col>

            </Row>

            <RaisedButton type="submit" label="Continue" primary />

        </form>
    )
};


export default reduxForm({
    form: 'signup-remain'
})(RemainingDataForm)
