/**
 * Created by artis on 28/04/2017.
 */

import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { hideSnackBar } from '../actions';


class GlobalMessageHandler extends Component {

    handleRequestClose = () => {
        this.props.dispatch(hideSnackBar());
    };

    render() {

        const { message, open } = this.props;

        return (
            <Snackbar
                open={open}
                message={message ? message : 'Something really bad happen..'}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.globalMessage.open,
        message: state.globalMessage.message
    }
};

export default connect(mapStateToProps) (GlobalMessageHandler)