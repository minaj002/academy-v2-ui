import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setTitle} from '../../../actions';
import {change} from 'redux-form';


import {Card, CardHeader} from 'material-ui/Card';

import './add-user.css';
import AddUserForm from "./components/AddUserForm";
import {addMember} from "../../../actions/addMember";
import {getSections} from "../../../actions/chooseRole";

class AddUser extends Component {

    constructor(props) {
        super(props);
        console.log("consructing Adduser: ", props);
        this.state = {
            open: false,
        };
    }

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
        this.props.dispatch(setTitle("Add User"));
    }

    componentDidMount() {
        this.props.dispatch(change('dashboard', 'name', localStorage.getItem("name")));
        this.props.dispatch(getSections())
    }

    handleSubmit = (user) => {
        const newMember = { firstName: user.firstName.trim(), lastName: user.lastName.trim(), dateOfBirth: user.dateOfBirth.trim()
            , email: user.email.trim(), phone: user.phone.trim(), street: user.street.trim(), city: user.city.trim()
            , sections: [user.section]
        };
        user.firstName = '';
        user.lastName='';
        user.dateOfBirth='';
        user.email='';
        user.phone='';
        user.street='';
        user.city='';

        this.props.dispatch(addMember(newMember));
    };

    render() {

        const { errorMessage, isFetching } = this.props;

        return (
            <div id="login-form">
                <Card className="card">
                    {errorMessage.error &&
                    <p className="error-message">{errorMessage.error}</p>
                    }
                    {errorMessage.message &&
                    <p className="error-message">{errorMessage.message}</p>
                    }

                    <AddUserForm errorMessage={this.props.errorMessage} isFetching={this.props.isFetching} onSubmit={this.handleSubmit} sections = {this.props.sections}/>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching,
    errorMessage: state.errors_messages,
    username: state.auth.userName,
    sections: state.sections,

});

export default connect(mapStateToProps) (AddUser);
