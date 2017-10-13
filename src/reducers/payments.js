import {createReducer} from '../utils';
import {
    CLOSE_PAYMENT_DIALOG, OPEN_PAYMENT_DIALOG, PAID_UNTIL_DATE, SET_ALL_MEMBERS, SET_AMOUNT, SET_PAYMENTS,
    SET_PAYMENTS_FOR_MEMBER
} from "../constants/index";

const initialState = {
    payments: [],
    members: [],
    paymentsForMember: [],
    open: false,
    selected: null,
    paidUntil: new Date(),
    amount: '45'
};

export default createReducer(initialState, {
    [SET_PAYMENTS]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'payments': action.payments,
            'members': state.members,
            'paymentsForMember': state.paymentsForMember,
            'open': state.open,
            'paidUntil' : state.paidUntil,
            'amount': state.amount
        });
    },
    [SET_ALL_MEMBERS]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'payments': state.payments,
            'members': action.members,
            'paymentsForMember': state.paymentsForMember,
            'open': state.open,
            'paidUntil' : state.paidUntil,
            'amount': state.amount
        });
    },
    [SET_PAYMENTS_FOR_MEMBER]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'payments': state.payments,
            'members': state.members,
            'paymentsForMember': action.paymentsForMember,
            'selected':action.selected,
            'open': state.open,
            'paidUntil' : state.paidUntil,
            'amount': state.amount
        });
    },
    [OPEN_PAYMENT_DIALOG]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'payments': state.payments,
            'members': state.members,
            'paymentsForMember': state.paymentsForMember,
            'selected':state.selected,
            'open': true,
            'paidUntil' : state.paidUntil,
            'amount': state.amount
        });
    },
    [CLOSE_PAYMENT_DIALOG]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'payments': state.payments,
            'members': state.members,
            'paymentsForMember': state.paymentsForMember,
            'selected':state.selected,
            'open': false,
            'paidUntil' : state.paidUntil,
            'amount': state.amount
        });
    },
    [PAID_UNTIL_DATE]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'payments': state.payments,
            'members': state.members,
            'paymentsForMember': state.paymentsForMember,
            'selected':state.selected,
            'open': state.open,
            'paidUntil' : action.paidUntil,
            'amount': state.amount
        });
    },
    [SET_AMOUNT]: (state, action) => {
        console.log(state, action);
        return Object.assign({}, state, {
            'payments': state.payments,
            'members': state.members,
            'paymentsForMember': state.paymentsForMember,
            'selected':state.selected,
            'open': state.open,
            'paidUntil' : state.paidUntil,
            'amount': action.amount
        });
    },

});
