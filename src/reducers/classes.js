import {createReducer} from '../utils';
import {SET_CLASS, SET_CLASSES} from "../constants/index";

const initialState = {
    classes: [],
    members: [],
    topic:"null"
};

export default createReducer(initialState, {
    [SET_CLASSES]: (state, action) => {
        console.log(state, action);
        let members = [];
        let topic = null;
        if(action.classes.length>0) {
            members = action.classes[0].members;
            topic = action.classes[0].topic
        }
        return Object.assign({}, state, {
            'classes': action.classes,
            'members': members,
            'topic'  : topic
        });
    },
    [SET_CLASS]: (state, action) => {
        console.log(state, action);

        return Object.assign({}, state, {
            'classes': state.classes,
            'members': action.members,
            'topic':action.topic
        });
    }
});
