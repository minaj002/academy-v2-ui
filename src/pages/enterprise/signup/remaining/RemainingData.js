/**
 * Created by artis on 01/08/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../../../actions/index';
import RemainingDataForm from './RemainingDataForm';


class RemainingData extends Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Remaining data'));
    }

    onSubmit = (values) => {
        console.log(values);
    };

    render() {
        return (
            <RemainingDataForm onSubmit={this.onSubmit}  />
        )
    }
}

export default connect() (RemainingData);