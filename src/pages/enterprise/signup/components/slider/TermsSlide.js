/**
 * Created by artis on 05/07/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Checkbox } from 'material-ui';
import merge from 'lodash/merge';
import { signup } from '../../../../../actions/business/signup';

/*const validate = values => {
    const errors = {};

    if (!values.agreeToTerms) {
        errors.agreeToTerms = "You must agree to terms and conditions"
    }

    return errors;
};*/

const CheckBoxField = ({ input, meta, ...custom }) => (
    <Checkbox {...input} {...custom} />
);

class TermsSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agreeToTerms: false
        }
    }

    handleSubmit = () => {
        let data = merge(this.props.data, this.state);
        this.props.dispatch(signup(data));
        //this.props.history.push('/signup/success');
    };

    onCheck = (e, checked) => {
        this.setState({agreeToTerms: checked});
    };

    render() {

        const { handleSubmit, pristine } = this.props;

        return (
            <form>

                <div className="mdc-typography--headline">Terms and Conditions</div>

                <div className="signup-field-group">
                    <Field onCheck={this.onCheck} defaultChecked={false} name="agreeToTerms"
                           label="I agree to terms and conditions" component={CheckBoxField} tabIndex="-1" />
                </div>
                <div>
                    <RaisedButton onTouchTap={this.handleSubmit} className="continue-button"
                                  disabled={!this.state.agreeToTerms}
                                  primary label="Open my account" />
                </div>

            </form>
        );
    }
}

TermsSlide.propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

TermsSlide = reduxForm({
    form: 'TermsSlide'
})(TermsSlide);

export default connect() (TermsSlide);
