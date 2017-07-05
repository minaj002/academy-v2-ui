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
    if (!values.lastName) {
        errors.lastName = "Last name is required"
    }

    return errors;
};

class LastNameSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your last name?</div>

                <Field name="lastName" hintText="e.g Smith" component={TextField} fullWidth tabIndex="-1" />

                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>


        );
    }
}

LastNameSlide = reduxForm({
    form: 'LastNameSlide',
    validate
})(LastNameSlide);

export default connect() (LastNameSlide);

