import doFetch from '../middleware/RestApi';
import {SET_CLASS, SET_CLASSES} from "../constants/index";

function setClasses(classes) {
    return {
        type: SET_CLASSES,
        classes: classes
    }
}

export function setClass(members, topic) {
    return {
        type: SET_CLASS,
        members: members,
        topic: topic
    }
}



export function getClasses(date) {
    return dispatch => {

        let configGet = {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        };
            dispatch(doFetch(`classes/`+date.getDate()+'-' + (date.getMonth()+1)+'-'+date.getFullYear(), configGet, true))
                .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
                .then(response => response.json())
                .then(response => {
                    dispatch(setClasses(response.response));

                })

    };
}
