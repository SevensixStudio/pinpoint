import { 
    FETCH_FORM_FIELDS,
    SET_FORM_FIELDS,
    REQUEST_START,
    REQUEST_END,
    REQUEST_ERROR,
 } from '../actions/types';

 const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    errorMessage: '',
    values: {}
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FORM_FIELDS:
            return Object.assign({}, state, {
                values: action.payload
            });
        case REQUEST_START:
            if (action.payload === FETCH_FORM_FIELDS) {
                return Object.assign({}, state, {
                    isLoading: true
                });
            }   
            return state;
        case REQUEST_END:
            if (action.payload === FETCH_FORM_FIELDS) {
                return Object.assign({}, state, {
                    isLoading: false
                });
            }   
            return state;
        case REQUEST_ERROR:
            if (action.payload === FETCH_FORM_FIELDS) {
                return Object.assign({}, state, {
                    isLoading: false,
                    isError: true,
                    errorMessage: action.error
                });
            }   
            return state;
        default: 
            return state;
    }
}