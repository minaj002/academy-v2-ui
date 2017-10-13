import doFetch from '../middleware/RestApi';
import {
    CLOSE_PAYMENT_DIALOG, OPEN_PAYMENT_DIALOG, PAID_UNTIL_DATE, SET_AMOUNT, SET_CLASS, SET_PAYMENTS,
    SET_PAYMENTS_FOR_MEMBER
} from "../constants/index";

function setPayments(payments) {
    return {
        type: SET_PAYMENTS,
        payments: payments
    }
}

export function setPaymentsForMembers(paymentsForMember, member) {
    console.log(paymentsForMember)
    return {
        type: SET_PAYMENTS_FOR_MEMBER,
        paymentsForMember: paymentsForMember,
        selected: member
    }
}

export function openDialog() {
    return {
        type: OPEN_PAYMENT_DIALOG
    }
}
export function closeDialog() {
    return {
        type: CLOSE_PAYMENT_DIALOG
    }
}
export function setPaidUntil(date) {
    return {
        type: PAID_UNTIL_DATE,
        paidUntil: date
    }
}
export function setAmount(amount) {
    return {
        type: SET_AMOUNT,
        amount: amount
    }
}

export function getPayments(date) {
    return dispatch => {

        let configGet = {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        };
            dispatch(doFetch(`payments/`+date.getDate()+'-' + (date.getMonth()+1)+'-'+date.getFullYear(), configGet, true))
                .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
                .then(response => response.json())
                .then(response => {
                    dispatch(setPayments(response.response));

                })

    };
}

export function makePayment(member, date, amount) {
    return dispatch => {

        // dispatch(requestLogin(creds));

        let payment = { 'amount' : amount, 'paymentDate' : new Date(), 'paidUntil': date, 'memberId':member.id }

        let configPost = {
            method: 'POST',
            body: JSON.stringify(payment)
        };

        dispatch(doFetch(`payments/new`, configPost, true))
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
            .then(response => response.json())
            .catch((error) => {
            });

    };
}

export function getPaymentsForMember(member, date) {
    return dispatch => {

        let configGet = {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        };
            dispatch(doFetch(`payments/`+date.getDate()+'-' + (date.getMonth()+1)+'-'+date.getFullYear()+'/12/'+member.id, configGet, true))
                .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    throw new Error("Authentication failed")
                }
            })
                .then(response => response.json())
                .then(response => {
                    dispatch(setPaymentsForMembers(response.response, member));

                })

    };
}
