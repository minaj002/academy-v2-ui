import {LOGOUT, GLOBAL_SNACKBAR_OPEN, GLOBAL_SNACKBAR_CLOSE, SET_TITLE} from '../constants';


function logout() {
    return {
        type: LOGOUT
    }
}

function showBar(message) {
    return {
        type: GLOBAL_SNACKBAR_OPEN,
        message: message,
        open: true
    }
}

function hideBar() {
    return {
        type: GLOBAL_SNACKBAR_CLOSE,
        message: null,
        open: false
    }
}

function addTitle(title) {
    return {
        type: SET_TITLE,
        text: title
    }
}

export function setTitle(title) {
    return dispatch => {
        dispatch(addTitle(title))
    }
}

export function showSnackBar(message) {
    return dispatch => {
        dispatch(showBar(message));
    }
}

export function hideSnackBar() {
    return dispatch => {
        dispatch(hideBar());
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch(logout());
    };
}
