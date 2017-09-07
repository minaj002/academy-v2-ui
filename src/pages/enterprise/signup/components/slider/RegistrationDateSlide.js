/**
 * Created by artis on 19/07/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';


class RegistrationDateSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">When is your company registered?</div>

                <div className="signup-field-group">
                    <Field name="dateOfIncorporation" hintText="e.g 1989-01-01" maxDate={new Date()} component={DatePicker}
                           fullWidth format={null} tabIndex="-1" />
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

RegistrationDateSlide = reduxForm({
    form: 'RegistrationDateSlide'
})(RegistrationDateSlide);

export default connect() (RegistrationDateSlide);