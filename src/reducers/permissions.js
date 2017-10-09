
import { createReducer } from '../utils';
import {CHANGE_ROLE, SET_ROLES, SET_NAME} from "../constants";
import {SET_ACCOUNT_INFO} from "../constants/index";

const initialState = {
    role: null,
    roles: null,
    name:null,
    cards: null,
    accountInfo : null
};

export default createReducer(initialState, {
    [SET_ROLES]: (state, action) => {
        console.log( "Setting roles: " , state, action);
        return Object.assign({}, state, {
            'roles' : action.roles,
            'role' : action.roles[0],
        });
    },
    [CHANGE_ROLE]: (state, action) => {
        console.log( "Changing role: " , state, action);
        return  Object.assign({}, state, {
            'role' : action.role,
        });
    },
    [SET_NAME]: (state, action) => {
        console.log( "setting name with role: " , state, action);
        return  Object.assign({}, state, {
            'name' : action.name,
            'cards': action.cards,
        });
    },
    [SET_ACCOUNT_INFO]: (state, action) => {
        console.log( "setting account info: " , state, action);
        return  Object.assign({}, state, {
            'accountInfo' : action.accountInfo
        });
    }
});
