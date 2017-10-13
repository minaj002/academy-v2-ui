import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardForm from './components/DashboardForm';
import {setTitle} from '../../../actions';
import {change} from 'redux-form';


import {Card} from 'material-ui/Card';

import './dashboard.css';
import {getMembers} from "../../../actions/getStatement";
import {checkConfirm, checkInChosen, chooseForCheckIn, closeConfirm, setClassTitle} from "../../../actions/checkin";
import {Dialog, FlatButton, RaisedButton} from "material-ui";
import DashboardConfirm from "./components/DashboardConfirm";

class Dashboard extends Component {

    handleClose = () => {
        this.props.dispatch(closeConfirm());
    };

    constructor(props) {
        super(props);
        console.log("consructing Dashboard: ", props);
        this.state = {
            open: false,
        };

    }

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
        this.props.dispatch(setTitle("Dashboard"));
    }

    componentDidMount() {
        this.props.dispatch(change('dashboard', 'name', localStorage.getItem("name")));
        this.props.dispatch(getMembers());
    }

    handleConfirm = () => {
        this.props.dispatch(checkInChosen())
    };

    checkIn = (event) => {
        console.log(event)
        this.props.dispatch(checkConfirm());
    }

    choose = (event) => {
        console.log(event)
        this.props.dispatch(chooseForCheckIn(event))
    }

    clickToCheckin = (event) => {
        console.log(event)
        this.props.dispatch(chooseForCheckIn(event))
        this.props.dispatch(checkConfirm());
    }

    setThisClassTitle = (event, title) => {
        this.props.dispatch(setClassTitle(title))
    }

    render() {

        const { errorMessage, isFetching } = this.props;

        return (
            <div id="dashboard-form">
                <Card className="card">
                    {errorMessage &&
                    <p className="error-message">{errorMessage}</p>
                    }
                    <DashboardForm isFetching={this.props.isFetching} checkIn = {this.checkIn}
                                   choose = {this.choose} checkedIn = {this.props.checkedIn} clickToCheckin={this.clickToCheckin}
                                   setClassTitle = {this.setThisClassTitle}
                    />

                    <DashboardConfirm dialog = {this.props.checkedIn} handleClose = {this.handleClose}
                            handleConfirm = {this.handleConfirm} >
                    </DashboardConfirm>
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
    checkedIn: state.checkin,

});

export default connect(mapStateToProps) (Dashboard);
