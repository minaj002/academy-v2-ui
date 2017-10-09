
import { createReducer } from '../utils';
import { SET_STATEMENT } from "../constants";

const initialState = {
    statement: null
};

export default createReducer(initialState, {
    [SET_STATEMENT]: (state, action) => {
        console.log( "Setting statement: " , state, action);
        return Object.assign({}, state, {
            'statement' : action.statement
        });
    }
});
