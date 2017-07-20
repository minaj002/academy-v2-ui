/**
 * Created by artis on 20/07/2017.
 */

import React, { Component } from 'react';
import { setTitle } from '../../actions/index';
import DoneAllIcon from 'material-ui/svg-icons/action/done-all';
import ReactTimeout from 'react-timeout';
import { grey900, cyan500 } from 'material-ui/styles/colors';
import {Motion, spring} from 'react-motion';
import './signup.css';


const defaultSvgStyle = {
    opacity: 0
};

const interpolateStyle = {
    opacity: spring(1)
};

class SignUpSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: grey900
        }
    }

    componentDidMount() {
        this.setState({open: true})
    }

    onRest = () => {
        this.setState({color: cyan500});
    };

    render() {

        return (
            <div id="signup-success">
                <Motion onRest={this.onRest} defaultStyle={defaultSvgStyle} style={interpolateStyle}>
                    {interpolatingStyle => <DoneAllIcon className="done-icon" color={this.state.color} style={interpolatingStyle} />}
                </Motion>


                <div className="mdc-typography--headline headline">
                    Thank you, you're up! Plase check your email and follow instructions!
                </div>
            </div>
        )
    }

}

export default ReactTimeout(SignUpSuccess);
