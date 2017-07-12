/**
 * Created by artis on 06/07/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

class GenderSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your gender?</div>

                <div className="signup-field-group">
                    <Field name="gender" component={RadioButtonGroup} tabIndex="-1">
                        <RadioButton value="M" label="Male" />
                        <RadioButton value="F" label="Female" />
                    </Field>
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

GenderSlide = reduxForm({
    form: 'GenderSlide'
})(GenderSlide);

export default connect() (GenderSlide);

