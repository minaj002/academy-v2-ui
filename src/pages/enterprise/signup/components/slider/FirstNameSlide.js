/**
 * Created by artis on 21/06/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = "First name is required"
    }
    else if (!/^[a-z]+$/i.test(values.firstName)) {
        errors.firstName = "Only latin alphabet allowed"
    }

    return errors;
};

class FirstNameSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your first name?</div>

                <div className="signup-field-group">
                    <Field name="firstName" hintText="e.g John" component={TextField} fullWidth tabIndex="-1" />
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

FirstNameSlide = reduxForm({
    form: 'FirstNameSlide',
    validate
})(FirstNameSlide);

export default connect() (FirstNameSlide);

