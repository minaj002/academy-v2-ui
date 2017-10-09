import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {
    Dialog, FlatButton,
} from "material-ui";

const validate = values => {
    const errors = {};
    return errors;
};

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        overflowY: 'auto',
    },
    gridTile: {
        width: '90%',
        height: 500,
        overflowY: 'auto',
        padding: 10,
        textAlign: 'center'
    },
    gridTileSmall: {
        width: 150,
        height: 80,
        overflowY: 'auto',
    },
};

const DashboardConfirm = props => {

    const {dialog, handleClose, handleConfirm} = props;
    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={handleClose}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={handleConfirm}
        />,
    ];

    return (
        <div>
            <Dialog
                title="Welcome to Brazilian Jiu-Jitsu Academy"
                actions={actions}
                modal={false}
                open={dialog ? dialog.open : false}
                onRequestClose={handleClose}
            >
                Hello {dialog.chosen ? dialog.chosen.firstName : ''}. Click Submit to join the class.
            </Dialog>
        </div>
    );

};

export default reduxForm({
    form: 'dashboardconfirm',
    validate,
})(DashboardConfirm)