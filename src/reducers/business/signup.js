/**
 * Created by artis on 20/07/2017.
 */

import { createReducer } from '../../utils';
import { BUSINESS_VERIFY_SIGNUP_REQUEST, BUSINESS_VERIFY_SIGNUP_SUCCESS, BUSINESS_VERIFY_SIGNUP_FAILURE } from '../../constants/business';

const initialState = {
    isFetching: false,
    error: null
};

export default createReducer(initialState, {
    [BUSINESS_VERIFY_SIGNUP_REQUEST]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': true,
            'error': null
        });
    },
    [BUSINESS_VERIFY_SIGNUP_SUCCESS]: (state, action) => {
        return  Object.assign({}, state, {
            'isFetching': false,
            'error': null
        });
    },
    [BUSINESS_VERIFY_SIGNUP_FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': false,
            'error': action.error
        });
    }
});

