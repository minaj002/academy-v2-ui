import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';
import title from './title';
import globalMessage from './globalMessage';
import permissions from "./permissions";
import sections from "./sections";
import checkin from "./checkin";
import classes from "./classes";
import payments from "./payments";
import errors_messages from "./errors_messages";

export default combineReducers({
    auth,
    title,
    globalMessage,
    permissions,
    sections,
    checkin,
    classes,
    payments,
    errors_messages,
    form: formReducer,

});