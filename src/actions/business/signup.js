/**
 * Created by artis on 20/07/2017.
 */

import { BUSINESS_VERIFY_SIGNUP_REQUEST, BUSINESS_VERIFY_SIGNUP_SUCCESS, BUSINESS_VERIFY_SIGNUP_FAILURE,
    BUSINESS_SIGNUP_REQUEST, BUSINESS_SIGNUP_SUCCESS, BUSINESS_SIGNUP_FAILURE } from '../../constants/business';
import doFetch from '../../middleware/RestApi';

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

function requestSignup() {
    return {
        type: BUSINESS_SIGNUP_REQUEST
    }
}

function receiveSignup() {
    return {
        type: BUSINESS_SIGNUP_SUCCESS
    }
}

function signupError(message) {
    return {
        type: BUSINESS_SIGNUP_FAILURE,
        error: message
    }
}

export function verifySignup(token, query) {

    const queryString = Object.keys(query).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
    }).join('&');

    return (dispatch) => new Promise((resolve, reject) =>  {

        dispatch(requestVerifySignup());

        return dispatch(doFetch(`${API_URL}auth/confirm/${token}?${queryString}`, {method: 'POST'})).then((response) => {
            if (response.ok()) {
                dispatch(receiveVerifySignup());
            }
            resolve(response);
        }).catch((e) => {
            dispatch(verifySignupError(e))
            reject(e);
        });
    });
}

export function signup(data) {

    return dispatch => new Promise((resolve, reject) => {

        let config = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        dispatch(requestSignup());

        return dispatch(doFetch(`${API_URL}apply/business`, config)).then((response) => {
            dispatch(receiveSignup())
            resolve(response);
        }).catch((error) => {
            dispatch(signupError(error))
            reject(e);
        })
    });
}
