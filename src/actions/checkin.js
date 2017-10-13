/**
 * Created by artis on 08/05/2017.
 */


import {
    CHEKIN_CHOSEN, CHEKIN_CONFIRM, CHOOSE_FOR_CHECKIN, CLOSE_CONFIRM, MEMBERS_SENT, SET_CLASS_TITLE,
    SET_UNCHECKED_MEMBERS
} from "../constants/index";
import doFetch from '../middleware/RestApi';


export function chooseForCheckIn(member) {

    return {
        type: CHOOSE_FOR_CHECKIN,
        chosen: member
    }
}

export function checkInChosen() {

    return {
        type: CHEKIN_CHOSEN
    }
}
export function checkConfirm() {

    return {
        type: CHEKIN_CONFIRM
    }
}
export function closeConfirm() {

    return {
        type: CLOSE_CONFIRM
    }
}

export function setMembers(members) {
    return {
        type: SET_UNCHECKED_MEMBERS,
        unchecked: members
    }
}

export function setClassTitle(title) {
    return {
        type: SET_CLASS_TITLE,
        title: title
    }
}

function membersSent() {
    return {
        type: MEMBERS_SENT
    }
}

export function sendStudents() {
    return dispatch => {

        let members = localStorage.getItem('checked');
        let classTitle = localStorage.getItem('classTitle');

        let classes = {'date': null, 'id': null, 'members' : JSON.parse(members), 'topic' : classTitle };

        let configPost = {
            method: 'POST',
            body: JSON.stringify(classes)
        };

        dispatch(doFetch(`classes/new`, configPost, true))
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    localStorage.removeItem('checked');
                    localStorage.removeItem('classTitle');
                    dispatch(membersSent());
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
            .catch((error) => {
                // dispatch(loginError("Authentication failed"))
            });

    };
}