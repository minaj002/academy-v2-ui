import {CHANGE_ROLE, LOGIN_SUCCESS} from '../constants';
import doFetch from '../middleware/RestApi';
import {SET_ACCOUNT_INFO, SET_ROLES, SET_SECTIONS, SET_STATEMENT} from "../constants/index";

let baseUrl = API_URL;

function changeRole(role) {
    return {
        type: CHANGE_ROLE,
        role: role
    }
}

function setSections(sections) {
    return {
        type: SET_SECTIONS,
        sections: sections
    }
}

function setAccountInfo(accountInfo) {
    return {
        type: SET_ACCOUNT_INFO,
        accountInfo: accountInfo
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

function receiveRoles(roles) {
    return {
        type: SET_ROLES,
        roles: roles
    }
}

function setStatement(statement) {
    return {
        type: SET_STATEMENT,
        statement: statement
    }
}

export function getRoleWithBusinessWithStatement() {

    return dispatch => {

        let configGet = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };


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
