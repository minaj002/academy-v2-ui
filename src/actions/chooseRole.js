import doFetch from '../middleware/RestApi';
import {SET_SECTIONS} from "../constants/index";

let baseUrl = API_URL;


function setSections(sections) {
    return {
        type: SET_SECTIONS,
        sections: sections
    }
}


export function getSections() {
    return dispatch => {
        // dispatch(changeRole(role));

        let configGet = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };


        dispatch(doFetch(`sections`, configGet, true))
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
            .then(response => response.json())
            .then(response => {
                dispatch(setSections(response.response));
            })


    };
}
