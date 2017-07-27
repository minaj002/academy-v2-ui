/**
 * Created by artis on 20/07/2017.
 */

import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import CredentialsForm from '../../../../components/forms/CredentialsForm';
import submit from './submit';

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = "Username is required"
    }
    if (!values.password) {
        errors.password = "Password is required"
    }

    return errors;
};

class Form extends Component{

    componentWillUpdate(nextProps, nextState) {
        this.props.setValid(nextProps.valid);
    }

    render() {

        return (
            <CredentialsForm />
        )
    }
};

export default reduxForm({
    form: 'signup-confirm',
    validate,
    onSubmit: submit
})(Form)
