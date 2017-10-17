import doFetch from '../middleware/RestApi';
import {QUERING_CLASSES, SET_CLASS, SET_CLASS_MEMBER, SET_CLASSES, SET_CLASSES_FOR_MEMBER} from "../constants/index";

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
export function queryClasses() {
    return {
        type: QUERING_CLASSES
    }
}
export function setClassMember(member) {
    return {
        type: SET_CLASS_MEMBER,
        member: member,
    }
}
function setClassesForMember(memberClasses) {
    return {
        type: SET_CLASSES_FOR_MEMBER,
        memberClasses: memberClasses,
    }
}

export function getClasses(date) {
    return dispatch => {

        dispatch(queryClasses())
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

export function getClassesForMember(member) {
    return dispatch => {

        let configGet = {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        };
            dispatch(doFetch(`members/${member.id}/classes/`, configGet, true))
                .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
                .then(response => response.json())
                .then(response => {
                    dispatch(setClassesForMember(response.response));

                })

    };
}
