/**
 * Created by artis on 08/05/2017.
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';
import doFetch from '../middleware/RestApi';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
    }
}

function receiveLogin(token) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token: token
        }
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        payload: {
            errorMessage: message
        }
    }
}

export function loginUser(creds) {

    return dispatch => {

        dispatch(requestLogin(creds));

        const queryString = Object.keys(creds).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(creds[key]);
        }).join('&');

        let config = {
            method: 'POST',
            headers: {'Content-Type':'application/json'}
        };

        dispatch(doFetch(`auth/login?${queryString}`, config))
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    localStorage.setItem('token', response.headers.get("Authorization"));
                    dispatch(receiveLogin(response.headers.get("Authorization")));
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
            .then(response => response.json())
            .then(response => {
            })
            .catch((error) => {
                dispatch(loginError("Authentication failed"))
            });
    };
}