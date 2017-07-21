/**
 * Created by artis on 20/07/2017.
 */

import { BUSINESS_VERIFY_SIGNUP_REQUEST, BUSINESS_VERIFY_SIGNUP_SUCCESS, BUSINESS_VERIFY_SIGNUP_FAILURE } from '../../constants/business';
import fetch from 'isomorphic-fetch';

function requestVerifySignup() {
    return {
        type: BUSINESS_VERIFY_SIGNUP_REQUEST
    }
}

function receiveVerifySignup() {
    return {
        type: BUSINESS_VERIFY_SIGNUP_SUCCESS
    }
}

function verifySignupError(message) {
    return {
        type: BUSINESS_VERIFY_SIGNUP_FAILURE,
        error: message
    }
}

export function verifySignup(token, query) {

    const queryString = Object.keys(query).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
    }).join('&');

    return dispatch => {

        dispatch(requestVerifySignup());

        return fetch(`${API_URL}auth/confirm/${token}?${queryString}`, {method: 'POST'}).then((response) => {
            dispatch(receiveVerifySignup())
        }).catch((error) => {
            dispatch(verifySignupError(error))
        })
    };
}
