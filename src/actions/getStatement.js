import doFetch from '../middleware/RestApi';
import {SET_STATEMENT} from "../constants/index";
import {setMembers} from "./checkin";

function setStatement(statement) {
    return {
        type: SET_STATEMENT,
        statement: statement
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
                    dispatch(setStatement(response.response));
                    dispatch(setMembers(response.response));

                })

    };
}
