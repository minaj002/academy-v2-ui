/**
 * Created by artis on 20/07/2017.
 */

import { SubmissionError } from 'redux-form';
import { verifySignup } from '../../../../actions/business/signup';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values, dispatch) {
    return dispatch(verifySignup("dummy", values)).then((e) => {
        // do nothing
    }).catch((e) => {
        throw new SubmissionError({'password': e.message});
    });
}

export default submit;
