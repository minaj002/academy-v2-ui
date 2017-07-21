/**
 * Created by artis on 20/07/2017.
 */

import React, { Component } from 'react';
import InputTextField from '../InputTextField';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

class CredentialsForm extends Component {

    componentDidMount() {
        this.refs.username.getRenderedComponent().getRenderedComponent().focus();
    }

    render() {

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="form">

                    <div className="field" >
                        <Field withRef ref="username" name="username" floatingLabelText="Username" component={TextField}
                               hintText="Username" />
                    </div>
                    <div className="field">
                        <Field name="password" type="password" floatingLabelText="Password" component={TextField} hintText="Password" />
                    </div>
                </div>
            </form>
        );
    }
};


export default CredentialsForm;