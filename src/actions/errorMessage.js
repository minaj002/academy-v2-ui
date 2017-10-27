import {SET_ERROR, SET_MESSAGE} from "../constants/index";

export function setError(error) {
    return {
        type: SET_ERROR,
        error: error
    }
}

export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        message: message
    }
}


