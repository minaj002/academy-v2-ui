/**
 * Created by artis on 14/06/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../../actions/index';
import ReactTimeout from 'react-timeout';

import SignupSlider from './components/slider/SignupSlider';

import './signup.css';

class SignUp extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentWillMount() {
        this.props.dispatch(setTitle("Sign Up"));
    }


    render() {
        return (
            <div id="signup">
                <SignupSlider history={this.props.history}  />
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default ReactTimeout(connect() (SignUp));
