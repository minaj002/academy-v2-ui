import {createReducer} from '../utils';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from '../constants';
import jwtDecode from 'jwt-decode';


const token = localStorage.getItem('token');
const initialState = {
    token: token,
    userName: token ? jwtDecode(token).sub : null,
    isAuthenticated: !!token,
    isFetching: false,
    errorMessage: null
};

export default createReducer(initialState, {
    [LOGIN_REQUEST]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': true,
            'errorMessage': null
        });
    },
    [LOGIN_SUCCESS]: (state, action) => {

        console.log(state, action);

        let obj =  Object.assign({}, state, {
            'isFetching': false,
            'isAuthenticated': true,
            'token': action.payload.token,
            'userName': jwtDecode(action.payload.token).sub,
            'errorMessage': null
        });

        return obj;

    },
    [LOGIN_FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            'isFetching': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'errorMessage': `Authentication error`
        });
    },
    [LOGOUT]: (state, action) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'errorMessage': null
        });
    }
});
