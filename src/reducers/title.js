/**
 * Created by artis on 17/05/2017.
 */

import {createReducer} from '../utils';
import {SET_TITLE} from '../constants';

let initialState = {
    text: "Weststein"
};

export default createReducer(initialState, {
    [SET_TITLE]: (state, action) => {
        return Object.assign({}, state, {
            'text': action.text
        });
    }
});