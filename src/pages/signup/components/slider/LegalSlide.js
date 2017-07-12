/**
 * Created by artis on 05/07/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Checkbox } from 'redux-form-material-ui';
/*const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = "Email is required"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Email is not correct"
    }

    return errors;
};*/

class LegalSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    onCheck = () => {

    };

    render() {

        const { handleSubmit, pristine } = this.props;

        return (
            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">Terms and Conditions</div>

                <div className="signup-field-group">
                    <Field name="agreeToTerms" onCheck="" label="I agree to terms and conditions" component={Checkbox} tabIndex="-1" />
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

LegalSlide = reduxForm({
    form: 'LegalSlide'
})(LegalSlide);

export default connect() (LegalSlide);
