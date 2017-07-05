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
    if (!values.email) {
        errors.email = "Email is required"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Email is not correct"
    }

    return errors;
};

class EmailSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your email address?</div>

                <Field name="email" hintText="e.g john@example.com" component={TextField} fullWidth tabIndex="-1" />

                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>
        );
    }
}

EmailSlide = reduxForm({
    form: 'EmailSlide',
    validate
})(EmailSlide);

export default connect() (EmailSlide);
