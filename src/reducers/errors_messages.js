import {createReducer} from '../utils';
import {SET_ERROR, SET_MESSAGE} from "../constants/index";

const initialState = {
    error: null,
    message: null
};

export default createReducer(initialState, {
    [SET_ERROR]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'error': action.error
        });
    },
    [SET_MESSAGE]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'message': action.message
        });
    }
});
