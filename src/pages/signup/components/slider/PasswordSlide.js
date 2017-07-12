/**
 * Created by artis on 21/06/2017.
 */


import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PasswordField from '../fields/PasswordField';

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = "Password is required";
    }
    return errors;
};

class PasswordSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false
        }
    }

    passwordIsValid = (valid) => {
        this.setState({valid: valid});
    };

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">Create your password</div>

                <PasswordField isValid={this.passwordIsValid} validLength={8} name="password" />

                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine || !this.state.valid}
                                  primary label="Continue" />
                </div>

            </form>

        );
    }
}

PasswordSlide = reduxForm({
    form: 'PasswordSlide',
    validate
})(PasswordSlide);

export default connect() (PasswordSlide);
