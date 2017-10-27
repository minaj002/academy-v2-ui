import { createReducer } from '../utils';
import { SIGNUP_VERIFY_EMAIL_REQUEST, SIGNUP_VERIFY_EMAIL_SUCCESS, SIGNUP_VERIFY_EMAIL_FAILURE } from '../constants';
import {SET_SECTIONS} from "../constants/index";

const initialState = {
    sections: null
};

export default createReducer(initialState, {
    [SET_SECTIONS]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'sections': action.sections
        });
    }
});
