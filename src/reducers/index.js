/**
 * Created by artis on 25/04/2017.
 */

import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import auth from './auth';
import title from './title';
import signup from './signup';
import globalMessage from './globalMessage';
import businessSignup from './business/signup';
import businessSignupRemaining from './business/signupRemaining';
import permissions from "./permissions";
import sections from "./sections";
import checkin from "./checkin";
import classes from "./classes";
import payments from "./payments";

export default combineReducers({
    auth,
    title,
    globalMessage,
    signup,
    permissions,
    businessSignup,
    businessSignupRemaining,
    sections,
    checkin,
    classes,
    payments,
    form: formReducer,

});