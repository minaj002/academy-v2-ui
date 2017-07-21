/**
 * Created by artis on 28/06/2017.
 */

import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';


const CountryAutoComplete = ({ input, label, meta: { touched, error }, ...custom }) => (
    <AutoComplete
                  {...input}
                  {...custom} />
);

export default CountryAutoComplete;
