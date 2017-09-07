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
import moment from 'moment';
import LoadingRaisedButton from '../../../../../components/LoadingRaisedButton';

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
            agree: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success) {
            this.props.history.push('/business/signup/success');
        }
    }

    handleSubmit = () => {
        let data = merge(this.props.data, this.state);
        data.dateOfIncorporation = moment(data.dateOfIncorporation).format("DDMMYYYY");
        this.props.dispatch(signup(data));
    };

    onCheck = (e, checked) => {
        this.setState({agree: checked});
    };

    render() {

        const { handleSubmit, pristine, isFetching } = this.props;

        return (
            <form>

                <div className="mdc-typography--headline">Terms and Conditions</div>

                <div className="signup-field-group">
                    <Field onCheck={this.onCheck} defaultChecked={false} name="agree"
                           label="I agree to terms and conditions" component={CheckBoxField} tabIndex="-1" />
                </div>
                <div>
                    <LoadingRaisedButton isFetching={isFetching} onTouchTap={this.handleSubmit} className="continue-button"
                                  disabled={!this.state.agree}
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

const mapStateToProps = (state) => ({
   success: state.businessSignup.success,
   error: state.businessSignup.error,
   isFetching: state.businessSignup.isFetching
});

export default connect(mapStateToProps) (TermsSlide);
