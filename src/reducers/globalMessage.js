import { createReducer } from '../utils';
import { GLOBAL_SNACKBAR_OPEN, GLOBAL_SNACKBAR_CLOSE } from '../constants';

const initialState = {
    open: false,
    errorMessage: null
};

export default createReducer(initialState, {
    [GLOBAL_SNACKBAR_OPEN]: (state, action) => {

        return Object.assign({}, state, {
            'open': true,
            'message': action.message,
        });
    },
    [GLOBAL_SNACKBAR_CLOSE]: (state, action) => {

        return Object.assign({}, state, {
            'open': false,
            'message': null,
        });
    }
});
