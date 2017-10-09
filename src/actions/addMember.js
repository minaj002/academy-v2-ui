/**
 * Created by artis on 08/05/2017.
 */

import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SET_ROLES} from '../constants';
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

export function addMember(member) {

    return dispatch => {

        // dispatch(requestLogin(creds));


        let configPost = {
            method: 'POST',
            body: JSON.stringify(member)
        };

        dispatch(doFetch(`members/new`, configPost, true))
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
            .then(response => response.json())
            .then(response => {
                localStorage.setItem('name', response.response);
            })
            .catch((error) => {
            dispatch(loginError("Authentication failed"))
        });

    };
}