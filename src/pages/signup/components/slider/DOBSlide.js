/**
 * Created by artis on 21/06/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';


class DOBSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">When is your birthday?</div>

                <Field name="dob" hintText="e.g 1989-01-01" component={DatePicker} fullWidth format={null} />

                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>

        );
    }
}

DOBSlide = reduxForm({
    form: 'BirthDaySlide'
})(DOBSlide);

export default connect() (DOBSlide);
