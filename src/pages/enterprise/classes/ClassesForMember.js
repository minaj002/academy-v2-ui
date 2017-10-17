import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setTitle} from '../../../actions';
import {change} from 'redux-form';


import {Card} from 'material-ui/Card';

import './classes.css';
import ClassesForMemberForm from "./components/ClassesForMemberForm";
import {getClassesForMember, setClassMember} from "../../../actions/getClasses";
import {getMembers} from "../../../actions/checkin";

class ClassesForMember extends Component {

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
        this.props.dispatch(setTitle("Classes For Member"));
    }

    componentDidMount() {
        this.props.dispatch(change('classesForMember ', 'name', localStorage.getItem("name")));
        this.props.dispatch(getMembers());
    }

    clickToSeeClasses = (event) => {
        console.log(event)
        this.props.dispatch(setClassMember(event))
        this.props.dispatch(getClassesForMember(event))
    }

    render() {

        const { errorMessage, isFetching } = this.props;

        return (
            <div id="dashboard-form">
                <Card className="card">
                    {errorMessage &&
                    <p className="error-message">{errorMessage}</p>
                    }
                    <ClassesForMemberForm isFetching={this.props.isFetching} classes = {this.props.classes} payments = {this.props.payments}
                                          clickToSeeClasses={this.clickToSeeClasses}
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
    classes: state.classes,
    payments: state.payments

});

export default connect(mapStateToProps) (ClassesForMember);
