import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClassesForm from './components/ClassesForm';
import {setTitle} from '../../../actions';
import {change} from 'redux-form';


import {Card} from 'material-ui/Card';

import './classes.css';
import {Dialog, FlatButton, RaisedButton} from "material-ui";
import {getClasses, setClass} from "../../../actions/getClasses";

class Classes extends Component {


    constructor(props) {
        super(props);
        console.log("constructing Classes: ", props);
        this.state = {
            open: false,
        };
    }

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
        this.props.dispatch(setTitle("Classes"));
    }

    componentDidMount() {
        this.props.dispatch(change('classes', 'name', localStorage.getItem("name")));
        this.props.dispatch(getClasses(new Date()));
    }

    chooseMonth = (event, date) => {
        console.log(event, date)
        this.props.dispatch(getClasses(date));
    }

    showAttended = (event) => {
        console.log(event)
        this.props.dispatch(setClass(event.members, event.topic))
    }

    render() {

        const { errorMessage, isFetching } = this.props;

        return (
            <div id="classes-form">
                <Card className="card">
                    {errorMessage &&
                    <p className="error-message">{errorMessage}</p>
                    }
                    <ClassesForm isFetching={this.props.isFetching} classes = {this.props.classes} showAttended = {this.showAttended}
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
    classes: state.classes,

});

export default connect(mapStateToProps) (Classes);
