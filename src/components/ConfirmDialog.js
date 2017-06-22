/**
 * Created by artis on 31/05/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DeleteConfirmDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        })
    }

    handleClose = () => {
        this.setState({open: false});
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    };

    handleConfirm = () => {
        this.setState({open: false});
        this.props.handleConfirm();
    };

    render() {

        const { confirmMessage } = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                disabled={this.state.fetching}
                onTouchTap={this.handleConfirm}
            />,
        ];

        return (
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>

                {confirmMessage}

            </Dialog>
        )
    }
}

DeleteConfirmDialog.propTypes = {
    //dispatch: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    confirmMessage: PropTypes.string.isRequired
};

export default DeleteConfirmDialog;