/**
 * Created by artis on 21/06/2017.
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const validate = (values, props) => {
    const errors = {};
    if (!values.passwordRepeat) {
        errors.passwordRepeat = "Password repeat is required";
    }

    if (props.password !== values.passwordRepeat) {
        errors.passwordRepeat = 'Passwords not match';
    }

    return errors;
};

class PasswordRepeatSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">Confirm your password</div>

                <Field name="passwordRepeat" type="password" hintText="********" component={TextField} fullWidth tabIndex="-1" />

                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>

        );
    }
}

PasswordRepeatSlide.propTypes = {
    password: PropTypes.string.isRequired
};

PasswordRepeatSlide = reduxForm({
    form: 'PasswordRepeatSlide',
    validate
})(PasswordRepeatSlide);

export default connect() (PasswordRepeatSlide);
