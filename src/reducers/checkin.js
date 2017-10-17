import {createReducer} from '../utils';
import {
    CHEKIN_CHOSEN,
    CHEKIN_CONFIRM,
    CHOOSE_FOR_CHECKIN,
    CLOSE_CONFIRM,
    MEMBERS_SENT, QUERING_MEMBERS,
    SET_CLASS_TITLE,
    SET_UNCHECKED_MEMBERS
} from "../constants/index";


const initialState = {
    chosen: null,
    checked: [],
    unchecked: [],
    searchText: '',
    open: false,
    title:'',
    quering: false

};

export default createReducer(initialState, {
    [CHOOSE_FOR_CHECKIN]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'chosen': action.chosen,
            'checked': state.checked,
            'searchText': action.chosen.firstName + ' ' + action.chosen.lastName,
            'unchecked':  state.unchecked,
            'open': false,
            'title': state.title,
            'quering': false
        });
    },
    [CHEKIN_CHOSEN]:(state, action) => {
        console.log(state, action);

        let people = state.checked.slice(0);
        if(people.find(m => {
                return state.chosen.id === m.id
            })) {} else {
            people.push(state.chosen);
        }
        const unchecked_people = state.unchecked.filter(
            el => {
                return el.id !== state.chosen.id })

        localStorage.setItem('checked', JSON.stringify(people.slice(0)));

        return Object.assign({}, state, {
            'checked': people,
            'chosen': null,
            'searchText': '',
            'unchecked':unchecked_people,
            'open': false,
            'title': state.title,
            'quering': false
        });
    },
    [CHEKIN_CONFIRM]:(state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'checked': state.checked,
            'chosen': state.chosen,
            'searchText': '',
            'unchecked':state.unchecked,
            'open': true,
            'title': state.title,
            'quering': false
        });
    },
    [CLOSE_CONFIRM]:(state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'checked': state.checked,
            'chosen': null,
            'searchText': '',
            'unchecked':state.unchecked,
            'open': false,
            'title': state.title,
            'quering': false
        });
    },
    [QUERING_MEMBERS]:(state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'checked': state.checked,
            'chosen': null,
            'searchText': '',
            'unchecked':state.unchecked,
            'open': false,
            'title': state.title,
            'quering': true
        });
    },
    [SET_UNCHECKED_MEMBERS]:(state, action) => {
        console.log(state, action);
        let unchecked_people = action.unchecked;
        let checked = localStorage.getItem("checked") === null ? [] : JSON.parse(localStorage.getItem("checked"));
        console.log(checked);
        if(checked.length > 0 ) {

            checked.forEach(e => {
                unchecked_people = unchecked_people.filter(el => {
                    return e.id !== el.id;
                })
            })
        } else  {
            unchecked_people = action.unchecked
        }

        return Object.assign({}, state, {
            'checked': checked,
            'chosen': state.chosen,
            'searchText': '',
            'unchecked':unchecked_people,
            'open': false,
            'title': state.title,
            'quering': false
        });
    },
    [MEMBERS_SENT]:(state, action) => {
        console.log(state, action);
        let unchecked_people = state.unchecked.concat(state.checked);
        return Object.assign({}, state, {
            'checked': [],
            'chosen': state.chosen,
            'searchText': '',
            'unchecked':unchecked_people,
            'open': false,
            'title': '',
            'quering': false
        });
    },
    [SET_CLASS_TITLE]:(state, action) => {
        console.log(state, action);
        localStorage.setItem('classTitle', action.title);
        return Object.assign({}, state, {
            'checked': state.checked,
            'chosen': state.chosen,
            'searchText': state.searchText,
            'unchecked':state.unchecked,
            'open': false,
            'title': action.title,
            'quering': false
        });
    },
});
