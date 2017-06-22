/**
 * Created by artis on 01/06/2017.
 */

import React from 'react';
import { Field } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import states from '../data/DE_states.json';

const StatesSelectField = (props) => {


    let statesMenu = states.map((state) => {
        return <MenuItem key={state.code} value={state.code} primaryText={state.name} />
    });

    return (
        <Field component={SelectField} {...props}>
            <MenuItem value="" primaryText="" />
            {statesMenu}
        </Field>
    )
};

export default StatesSelectField;