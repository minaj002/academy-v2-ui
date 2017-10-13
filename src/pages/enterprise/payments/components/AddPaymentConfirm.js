import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {DatePicker, Dialog, FlatButton, TextField,} from "material-ui";
import InputTextField from "../../../../components/InputTextField";

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
        width: '60%',
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

const AddPaymentConfirm = props => {

    const {dialog, handleClose, handleConfirm, chooseDate, chooseAmount} = props;
    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={handleClose}
        />,
        <FlatButton
            id={dialog.selected}
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={handleConfirm}
        />,
    ];

    return (
        <div>
            <Dialog
                title={dialog.selected ? "Payment for " + dialog.selected.firstName + " " + dialog.selected.lastName :" "}
                actions={actions}
                modal={false}
                open={dialog.open}
                onRequestClose={handleClose}
            >
                <DatePicker hintText="Choose month" onChange={chooseDate} style={styles.gridTile}
                            floatingLabelText="Pay Until"/>
                <TextField
                    hintText="Payment Amount"
                    id="text-field-default"
                    value={dialog.amount}
                    onChange={chooseAmount}
                    style={styles.gridTile}
                    floatingLabelText="Amount"
                />
            </Dialog>
        </div>
    );

};

export default reduxForm({
    form: 'addpaymentconfirm',
    validate,
})(AddPaymentConfirm)