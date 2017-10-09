/**
 * Created by artis on 25/04/2017.
 */

import { createReducer } from '../utils';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../constants';
import jwtDecode from 'jwt-decode';
import {
    CHEKIN_CHOSEN, CHEKIN_CONFIRM, CHOOSE_FOR_CHECKIN, CLOSE_CONFIRM,
    SET_UNCHECKED_MEMBERS
} from "../constants/index";


const initialState = {
    chosen: null,
    checked: [],
    unchecked: [],
    searchText: '',
    open: false

};

export default createReducer(initialState, {
    [CHOOSE_FOR_CHECKIN]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'chosen': action.chosen,
            'checked': state.checked,
            'searchText': action.chosen.firstName + ' ' + action.chosen.lastName,
            'unchecked':  state.unchecked,
            'open': false

        });
    },
    [CHEKIN_CHOSEN]:(state, action) => {
        console.log(state, action);

        const people = state.checked.slice(0);
        people.push(state.chosen);

        const unchecked_people = state.unchecked.filter(
            el => {
                return el.id !== state.chosen.id })

        localStorage.setItem('checked', JSON.stringify(people.slice(0)));

        return Object.assign({}, state, {
            'checked': people,
            'chosen': null,
            'searchText': '',
            'unchecked':unchecked_people,
            'open': false
        });
    },
    [CHEKIN_CONFIRM]:(state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'checked': state.checked,
            'chosen': state.chosen,
            'searchText': '',
            'unchecked':state.unchecked,
            'open': true
        });
    },
    [CLOSE_CONFIRM]:(state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'checked': state.checked,
            'chosen': null,
            'searchText': '',
            'unchecked':state.unchecked,
            'open': false
        });
    },
    [SET_UNCHECKED_MEMBERS]:(state, action) => {
        console.log(state, action);

        let checked = JSON.parse(localStorage.getItem("checked"));
        const unchecked_people = action.unchecked.filter(
            el =>{return checked.find( mem => {

                console.log(el.id,  mem.id, el.id !== mem.id)

                return el.id !== mem.id })}
                )

        return Object.assign({}, state, {
            'checked': checked,
            'chosen': state.chosen,
            'searchText': '',
            'unchecked':unchecked_people,
            'open': false
        });
    },
});
