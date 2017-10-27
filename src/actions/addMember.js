import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SET_ROLES} from '../constants';
import doFetch from '../middleware/RestApi';
import {setError, setMessage} from "./errorMessage";

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
                    throw new Error("Error: " + response.status)
                }
            })
            .then(dispatch(setMessage("Member "+ member.firstName + " "+ member.lastName + " was added")))
            .catch((error) => {
                dispatch(setError(error))
        });

    };
}