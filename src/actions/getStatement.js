import doFetch from '../middleware/RestApi';
import {setMembers} from "./checkin";
import {SET_ALL_MEMBERS} from "../constants/index";

function setAllMembers(members) {
    return {
        type: SET_ALL_MEMBERS,
        members: members
    }
}

export function getMembers() {
    return dispatch => {

        let configGet = {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        };

            dispatch(doFetch(`members`, configGet, true))
                .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
                .then(response => response.json())
                .then(response => {
                    dispatch(setAllMembers(response.response));
                    dispatch(setMembers(response.response));

                })

    };
}
