/**
 * Created by artis on 01/08/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../../../actions/index';
import { signupRemaining } from '../../../../actions/business/signupRemaining';
import RemainingDataForm from './RemainingDataForm';


class RemainingData extends Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Remaining data'));
    }

    onSubmit = (values) => {
        this.props.dispatch(signupRemaining(values));
    };

    render() {
        return (
            <div className="push-middle">
                <RemainingDataForm onSubmit={this.onSubmit}  />
            </div>
        )
    }
}

export default connect() (RemainingData);