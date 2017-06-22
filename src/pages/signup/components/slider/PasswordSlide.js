/**
 * Created by artis on 21/06/2017.
 */


import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';


class PasswordSlide extends Component {

    render() {

        const { handleSubmit, pristine } = this.props;

        return (

            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">Create your password</div>

                <Field name="password" type="password" hintText="********" component={TextField} fullWidth />

                <div>
                    <RaisedButton onTouchTap={() => handleSubmit()} className="continue-button"
                                  disabled={pristine}
                                  primary label="Continue" />
                </div>

            </form>

        );
    }
}

PasswordSlide = reduxForm({
    form: 'PasswordSlide'
})(PasswordSlide);

export default connect() (PasswordSlide);
