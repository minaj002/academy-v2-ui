/**
 * Created by artis on 12/07/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { cyan500 } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';

class PasswordField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            oneUppercase: false,
            oneNumberic: false,
            validLength: false
        }
    }

    onChange = (e, newValue) => {
        let oneUppercase = /[A-Z]/.test(newValue);
        let oneNumeric = /[0-9]/.test(newValue);
        let validLength = newValue.length>=this.props.validLength;
        let valid = oneUppercase && oneNumeric && validLength;

        this.setState({
            valid: valid,
            oneUppercase: oneUppercase,
            oneNumberic: oneNumeric,
            validLength: validLength
        });

        if (this.props.isValid) {
            this.props.isValid(valid);
        }
    };

    render() {

        const { isValid, validLength, ...rest } = this.props;

        const chipOpts = {
            className: "password-chip",
            upperCase: {
                color: this.state.oneUppercase ? cyan500 : null
            },
            numeric: {
                color: this.state.oneNumberic ? cyan500 : null
            },
            validLength: {
                color: this.state.validLength ? cyan500 : null
            }
        };

        return (
            <div>
                <div className="mdc-typography--subheading2 password-subheading-wrap">
                    Your password must contain at least one
                    <Chip backgroundColor={chipOpts.upperCase.color} className={chipOpts.className}>Uppercase</Chip>
                    letter, one
                    <Chip backgroundColor={chipOpts.numeric.color}  className={chipOpts.className}>numeric</Chip>
                    and at least
                    <Chip backgroundColor={chipOpts.validLength.color} className={chipOpts.className}>8 symbols</Chip>
                    length.
                </div>
                <div className="signup-field-group">
                    <Field onChange={this.onChange} type="password" hintText="********" component={TextField} fullWidth tabIndex="-1" {...rest}  />
                </div>
            </div>
        )
    }

}

PasswordField.propTypes = {
    validLength: PropTypes.number.isRequired,
    isValid: PropTypes.func
};

export default PasswordField;
