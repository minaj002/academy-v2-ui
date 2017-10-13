import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setTitle} from '../../../actions';
import {change} from 'redux-form';


import {Card} from 'material-ui/Card';

import './payments.css';
import {getMembers} from "../../../actions/getStatement";
import {Dialog, FlatButton, RaisedButton} from "material-ui";
import AddPaymentForm from "./components/AddPaymentForm";
import {
    closeDialog, getPaymentsForMember, makePayment, openDialog, setAmount,
    setPaidUntil
} from "../../../actions/getPayments";
import AddPaymentConfirm from "./components/AddPaymentConfirm";

class AddPayment extends Component {

    handleClose = () => {
        this.props.dispatch(closeDialog());
    };

    openPaymentDialog = () => {
        console.log('Pay your bills '+ event)
        this.props.dispatch(openDialog())
    }

    constructor(props) {
        super(props);
        console.log("constructing AddPayment: ", props);
        this.state = {
            open: false,
        };
    }

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
        this.props.dispatch(setTitle("Add Payment"));
    }

    componentDidMount() {
        this.props.dispatch(change('addpayment ', 'name', localStorage.getItem("name")));
        this.props.dispatch(getMembers());
    }

    handleConfirm = () => {
        this.props.dispatch(makePayment(this.props.payments.selected, this.props.payments.paidUntil, this.props.payments.amount))
        this.props.dispatch(closeDialog());

    };

    clickToSeePayments = (event) => {
        console.log(event)
        this.props.dispatch(getPaymentsForMember(event, new Date()))
    }
    chooseDate = (event, date) => {
        console.log(date)
        this.props.dispatch(setPaidUntil(date));
    }
    chooseAmount = (event, amount) => {
        this.props.dispatch(setAmount(amount))
    }

    render() {

        const { errorMessage, isFetching } = this.props;

        return (
            <div id="dashboard-form">
                <Card className="card">
                    {errorMessage &&
                    <p className="error-message">{errorMessage}</p>
                    }
                    <AddPaymentForm isFetching={this.props.isFetching} payments = {this.props.payments}
                                    clickToSeePayments={this.clickToSeePayments}
                                    openPaymentDialog={this.openPaymentDialog}
                    />

                    <AddPaymentConfirm dialog = {this.props.payments} handleClose = {this.handleClose}
                            handleConfirm = {this.handleConfirm} chooseDate={this.chooseDate} chooseAmount={this.chooseAmount}>
                    </AddPaymentConfirm>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage,
    username: state.auth.userName,
    payments: state.payments

});

export default connect(mapStateToProps) (AddPayment);
