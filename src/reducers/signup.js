/**
 * Created by artis on 12/07/2017.
 */

import { createReducer } from '../utils';
import { SIGNUP_VERIFY_EMAIL_REQUEST, SIGNUP_VERIFY_EMAIL_SUCCESS, SIGNUP_VERIFY_EMAIL_FAILURE } from '../constants';

const initialState = {
    isFetching: false,
    error: null
};

export default createReducer(initialState, {
    [SIGNUP_VERIFY_EMAIL_REQUEST]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': true,
            'error': null
        });
    },
    [SIGNUP_VERIFY_EMAIL_SUCCESS]: (state, action) => {
        return  Object.assign({}, state, {
            'isFetching': false,
            'error': null
        });
    },
    [SIGNUP_VERIFY_EMAIL_FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': false,
            'error': action.error
        });
    }
});
