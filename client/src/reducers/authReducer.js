import { 
    FETCH_USER,
    SET_USER,
    REQUEST_START,
    REQUEST_END,
    REQUEST_ERROR, } from '../actions/types';

const INITIAL_STATE = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    user: null
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, {
                user: action.payload || false
            });
        case REQUEST_START:
            if (action.payload === FETCH_USER) {
                return Object.assign({}, state, {
                    isLoading: true
                });
            }   
            return state;
        case REQUEST_END:
            if (action.payload === FETCH_USER) {
                return Object.assign({}, state, {
                    isLoading: false
                });
            }   
            return state;
        case REQUEST_ERROR:
            if (action.payload === FETCH_USER) {
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