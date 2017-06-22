/**
 * Created by artis on 16/05/2017.
 */

import React from 'react';
import { Field } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import countries from '../data/countries.json';

const CountriesSelectField = (props) => {

    let countriesMenu = countries.map((country) => {
        return <MenuItem key={country.alpha2Code} value={country.alpha2Code} primaryText={country.name} />
    });

    return (
        <Field component={SelectField} {...props}>
            {countriesMenu}
        </Field>
    )
};

export default CountriesSelectField;