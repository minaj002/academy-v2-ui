import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setTitle} from '../../../actions';
import {change} from 'redux-form';


import {Card} from 'material-ui/Card';

import './payments.css';
import {Dialog, FlatButton, RaisedButton} from "material-ui";
import PaymentsForm from "./components/PaymentsForm";
import {getPayments, getPaymentsForMember} from "../../../actions/getPayments";
import {getMembers} from "../../../actions/getStatement";

class Payments extends Component {


    constructor(props) {
        super(props);
        console.log("constructing Payments: ", props);
        this.state = {
            open: false,
        };
    }

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
        this.props.dispatch(setTitle("Payments"));
    }

    componentDidMount() {
        this.props.dispatch(change('payments', 'name', localStorage.getItem("name")));
        this.props.dispatch(getPayments(new Date()));
        this.props.dispatch(getMembers());
    }

    chooseMonth = (event, date) => {
        console.log(event, date)
        this.props.dispatch(getPayments(date));
    }

    clickToSeePayments = (event) => {
        console.log(event)

        let member = this.props.payments.members.find(member => {
            return member.id === event.memberId;
        })

        this.props.dispatch(getPaymentsForMember(member, new Date()))
    }

    render() {

        const { errorMessage, isFetching } = this.props;

        return (
            <div id="classes-form">
                <Card className="card">
                    {errorMessage &&
                    <p className="error-message">{errorMessage}</p>
                    }
                    <PaymentsForm isFetching={this.props.isFetching} payments = {this.props.payments} clickToSeePayments = {this.clickToSeePayments}
                                 chooseMonth={this.chooseMonth}
                    />

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
    payments: state.payments,
});

export default connect(mapStateToProps) (Payments);
