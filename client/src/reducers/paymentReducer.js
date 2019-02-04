import {
    PAYMENT_SUCCESSFUL, 
    HANDLE_TOKEN,
    REQUEST_START,
    REQUEST_END,
    REQUEST_ERROR,
    RESET_PAYMENT
 } from '../actions/types';

 const INITIAL_STATE = {
     isProcessing: false,
     isError: false,
     errorMessage: '',
     paymentSuccessful: false
 }

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PAYMENT_SUCCESSFUL:
            return Object.assign({}, state, {
                paymentSuccessful: true
            });
        case REQUEST_START:
            if (action.payload === HANDLE_TOKEN) {
                return Object.assign({}, state, {
                    isProcessing: true
                });
            }   
            return state;
        case REQUEST_END:
            if (action.payload === HANDLE_TOKEN) {
                return Object.assign({}, state, {
                    isProcessing: false
                });
            }   
            return state;
        case REQUEST_ERROR:
            if (action.payload === HANDLE_TOKEN) {
                return Object.assign({}, state, {
                    isProcessing: false,
                    isError: true,
                    errorMessage: action.error
                });
            }   
            return state;
        case RESET_PAYMENT: 
            return (Object.assign({}, state, INITIAL_STATE));
        default: 
            return state;
    }
}