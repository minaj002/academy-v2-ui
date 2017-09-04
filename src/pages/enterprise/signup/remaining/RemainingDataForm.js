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
        props.change("registeredAddress.line1", item.line1);
        props.change("registeredAddress.city", item.city);
        props.change("registeredAddress.postalCode", item.postalCode);
    };


    const { handleSubmit } = props;

    return (
        <form style={{width: '50%'}} onSubmit={handleSubmit}>

            <Field name="legalName" floatingLabelText="Legal name" component={TextField} fullWidth/>

            <Field name="tradingName" floatingLabelText="Trading name (if different)" component={TextField}
                   fullWidth/>

            <Field name="legalStatus" floatingLabelText="Legal status" component={TextField} fullWidth />

            <Field name="registeredAddress.country" component={AutoComplete} floatingLabelText="Country" maxSearchResults={5}
                   dataSourceConfig={{text: 'name', value: 'alpha2Code'}}
                   dataSource={countries}
                   filter={MUIAutoComplete.caseInsensitiveFilter}
                   onNewRequest={onCountryNewRequest}
                   onUpdateInput={onCountryChange} fullWidth />

            <Field name="registeredAddress.line1" floatingLabelText="Registered business address"
                   component={GooglePlaceAutoComplete} onItemSelected={onItemSelected} fullWidth/>

            <Field name="registeredAddress.city" floatingLabelText="City"
                   component={TextField} fullWidth/>

            <Field name="registeredAddress.postalCode" floatingLabelText="Postal code"
                   component={TextField} fullWidth />

            <Field name="placeOfBusiness" floatingLabelText="Principal Place of Business (if different)"
                   component={TextField} fullWidth />

            <Field name="businessLandlinePhone" floatingLabelText="Business Landline Phone"
                   hintText="Start with country code"
                   component={TextField} fullWidth />

            <Field name="businessMobilePhone" floatingLabelText="Business Mobile Phone "
                   hintText="Start with country code"
                   component={TextField} fullWidth />

            <div>
                <RaisedButton type="submit" label="Continue" primary />
            </div>

        </form>
    )
};


export default reduxForm({
    form: 'signup-remain'
})(RemainingDataForm)
