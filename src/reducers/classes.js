import {createReducer} from '../utils';
import {QUERING_CLASSES, SET_CLASS, SET_CLASS_MEMBER, SET_CLASSES, SET_CLASSES_FOR_MEMBER} from "../constants/index";

const initialState = {
    classes: [],
    members: [],
    topic: null,
    member: null,
    memberClasses: [],
    quering: false
};

export default createReducer(initialState, {
    [SET_CLASSES]: (state, action) => {
        console.log(state, action);
        let members = [];
        let topic = null;
        if (action.classes.length > 0) {
            members = action.classes[0].members;
            topic = action.classes[0].topic
        }
        return Object.assign({}, state, {
            'classes': action.classes,
            'members': members,
            'topic': topic,
            'member':state.member,
            'memberClasses': state.memberClasses,
            'quering': false
        });
    },
    [SET_CLASS]: (state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'classes': state.classes,
            'members': action.members,
            'topic': action.topic,
            'member':state.member,
            'memberClasses': state.memberClasses,
            'quering': false
        });
    },
    [QUERING_CLASSES]: (state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'classes': state.classes,
            'members': state.members,
            'topic': state.topic,
            'member':state.member,
            'memberClasses': state.memberClasses,
            'quering': true
        });
    },
    [SET_CLASS_MEMBER]: (state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'classes': state.classes,
            'members': state.members,
            'topic': state.topic,
            'member':action.member,
            'memberClasses': state.memberClasses,
            'quering': false
        });
    },
    [SET_CLASSES_FOR_MEMBER]: (state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'classes': state.classes,
            'members': state.members,
            'topic': state.topic,
            'member':state.member,
            'memberClasses': action.memberClasses,
            'quering': false
        });
    },

});
