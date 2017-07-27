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
    if (!values.position) {
        errors.position = "Position is required"
    }

    return errors;
};

class PositionSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your position in company?</div>

                <div className="signup-field-group">
                    <Field name="position" hintText="e.g Founder" component={TextField} fullWidth tabIndex="-1" />
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

PositionSlide = reduxForm({
    form: 'PositionSlide',
    validate
})(PositionSlide);

export default connect() (PositionSlide);
