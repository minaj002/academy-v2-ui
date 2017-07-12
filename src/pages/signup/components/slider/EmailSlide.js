/**
 * Created by artis on 21/06/2017.
 */

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { verifyEmail } from '../../../../actions/signup';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = "Email is required"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Email is not correct"
    }

    return errors;
};

const asyncValidate = (values, dispatch) => {
    return dispatch(verifyEmail(values.email)).catch((err) => {
        throw {email: 'Not a correct email address'}
    });
};

class EmailSlide extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { pristine, handleSubmit, isFetching } = this.props;

        console.log(isFetching);

        const progress = isFetching ? <CircularProgress size={24}/> : null;

        return (
            <form onSubmit={handleSubmit}>

                <div className="mdc-typography--headline">What's your email address?</div>
                <div className="signup-field-group">
                    <Field name="email" withRef ref="email" hintText="e.g john@example.com" component={TextField} fullWidth tabIndex="-1" />
                </div>
                <div>
                    <RaisedButton type="submit" className="continue-button"
                                  disabled={pristine || isFetching}
                                  icon={progress}
                                  primary label="Continue" />
                </div>

            </form>
        );
    }
}


const mapStateToProps = (state) => ({
    isFetching: state.signup.isFetching
});

EmailSlide = reduxForm({
    form: 'EmailSlide',
    validate,
    asyncValidate,
    asyncBlurFields: []
})(EmailSlide);

export default connect(mapStateToProps) (EmailSlide);
