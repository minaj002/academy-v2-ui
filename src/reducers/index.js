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

export default combineReducers({
    auth,
    title,
    globalMessage,
    signup,
    businessSignup,
    form: formReducer,

});