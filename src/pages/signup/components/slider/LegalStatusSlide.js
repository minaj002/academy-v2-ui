/**
 * Created by artis on 19/07/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { RadioButton } from 'material-ui/RadioButton'
import { RadioButtonGroup, TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const validate  = (values) => {
    const errors = {};
    if (values.legalStatus==="3" && !values.other) {
        errors.other = "Please specify your legal status"
    }
    return errors;
};

class LegalStatusSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            legalStatus: null
        }
    }

    onChange = (e, value) => {
        this.setState({legalStatus: value});
    };

    render() {

        const { handleSubmit, pristine } = this.props;

        console.log(this.state);

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your legal status?</div>

                <div className="signup-field-group">
                    <Field name="legalStatus" onChange={this.onChange} component={RadioButtonGroup} tabIndex="-1">
                        <RadioButton value="0" label="Private limited company" />
                        <RadioButton value="1" label="Public limited company" />
                        <RadioButton value="3" label="Other" />
                    </Field>

                    { this.state.legalStatus==="3" &&
                    <Field name="other" withRef ref="other" floatingLabelText="Please specify" floatingLabelFixed={true}
                           component={TextField} tabIndex="-1"/>
                    }

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

LegalStatusSlide = reduxForm({
    form: 'LegalStatusSlide',
    validate
})(LegalStatusSlide);

export default connect() (LegalStatusSlide);
