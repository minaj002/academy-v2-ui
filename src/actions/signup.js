/**
 * Created by artis on 12/07/2017.
 */


import { SIGNUP_VERIFY_EMAIL_REQUEST, SIGNUP_VERIFY_EMAIL_SUCCESS, SIGNUP_VERIFY_EMAIL_FAILURE } from '../constants';
import fetch from 'isomorphic-fetch';

function requestVerifyEmail() {
    return {
        type: SIGNUP_VERIFY_EMAIL_REQUEST
    }
}

function receiveVerifyEmail(payload) {
    return {
        type: SIGNUP_VERIFY_EMAIL_SUCCESS
    }
}

function verifyEmailError(message) {
    return {
        type: SIGNUP_VERIFY_EMAIL_FAILURE,
        error: message
    }
}

export function verifyEmail(email) {

    return dispatch => {

        dispatch(requestVerifyEmail());

        return fetch(`${API_URL}apply/verify?email=${email}`, {method: 'POST'}).then((response) => {
            dispatch(receiveVerifyEmail())
        }).catch((error) => {
            dispatch(verifyEmailError())
        })
    };
}
