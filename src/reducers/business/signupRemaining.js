/**
 * Created by artis on 20/07/2017.
 */

import { createReducer } from '../../utils';
import { BUSINESS_SIGNUP_REMAINING_REQUEST, BUSINESS_SIGNUP_REMAINING_SUCCESS,
    BUSINESS_SIGNUP_REMAINING_FAILURE}from '../../constants/business';

const initialState = {
    isFetching: false,
    error: null
};

export default createReducer(initialState, {
    [BUSINESS_SIGNUP_REMAINING_REQUEST]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': true,
            'error': null
        });
    },
    [BUSINESS_SIGNUP_REMAINING_SUCCESS]: (state, action) => {
        return  Object.assign({}, state, {
            'isFetching': false,
            'error': null
        });
    },
    [BUSINESS_SIGNUP_REMAINING_FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': false,
            'error': action.error
        });
    }
});

