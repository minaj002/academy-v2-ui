/**
 * Created by artis on 20/07/2017.
 */

import { BUSINESS_SIGNUP_REMAINING_REQUEST, BUSINESS_SIGNUP_REMAINING_SUCCESS,
    BUSINESS_SIGNUP_REMAINING_FAILURE}from '../../constants/business';

import doFetch from '../../middleware/RestApi';

function requestSignupRemaining() {
    return {
        type: BUSINESS_SIGNUP_REMAINING_REQUEST
    }
}

function receiveSignupRemaining() {
    return {
        type: BUSINESS_SIGNUP_REMAINING_SUCCESS
    }
}

function signupRemainingError(message) {
    return {
        type: BUSINESS_SIGNUP_REMAINING_FAILURE,
        error: message
    }
}

export function signupRemaining(id, data) {

    return dispatch => new Promise((resolve, reject) => {

        let config = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        dispatch(requestSignupRemaining());

        return dispatch(doFetch(`business/${id}/application/company-info`, config)).then((response) => {
            dispatch(receiveSignupRemaining());
            resolve(response);
        }).catch((error) => {
            dispatch(signupRemainingError(error));
            reject(e);
        })
    });
}
