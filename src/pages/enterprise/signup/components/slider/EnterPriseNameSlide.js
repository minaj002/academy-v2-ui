/**
 * Created by artis on 19/07/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
    const errors = {};
    if (!values.enterPriseName) {
        errors.enterPriseName = "First name is required"
    }
    else if (!/^[a-z0-9- ]+$/i.test(values.enterPriseName)) {
        errors.enterPriseName = "Only latin alphabet allowed"
    }

    return errors;
};

class EnterPriseNameSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your enterprise name?</div>

                <div className="signup-field-group">
                    <Field name="enterpriseName" hintText="e.g My Company" component={TextField} fullWidth tabIndex="-1" />
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

EnterPriseNameSlide = reduxForm({
    form: 'EnterPriseNameSlide',
    validate
})(EnterPriseNameSlide);

export default connect() (EnterPriseNameSlide);
