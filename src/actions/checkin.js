import {
    CHEKIN_CHOSEN, CHEKIN_CONFIRM, CHOOSE_FOR_CHECKIN, CLOSE_CONFIRM, MEMBERS_SENT, QUERING_MEMBERS, SET_ALL_MEMBERS,
    SET_CLASS_TITLE,
    SET_UNCHECKED_MEMBERS
} from "../constants/index";
import doFetch from '../middleware/RestApi';
import {setError, setMessage} from "./errorMessage";


export function chooseForCheckIn(member) {

    return {
        type: CHOOSE_FOR_CHECKIN,
        chosen: member
    }
}

export function queringMembers() {
    return {
        type: QUERING_MEMBERS
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

function setAllMembers(members) {
    return {
        type: SET_ALL_MEMBERS,
        members: members
    }
}

export function getMembers() {
    return dispatch => {

        dispatch(queringMembers());

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
            .then(dispatch(setMessage(JSON.parse(members).length + " Members attended class.")))
            .catch((error) => {
                setError(error)
            });

    };
}