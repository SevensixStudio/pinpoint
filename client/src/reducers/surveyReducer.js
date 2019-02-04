import { 
    FETCH_SURVEY,
    SET_SURVEY,
    REQUEST_START,
    REQUEST_END,
    REQUEST_ERROR,
 } from '../actions/types';

 const INITIAL_STATE = {
     isLoading: true,
     isError: false,
     errorMessage: '',
     survey: {}
 }

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_SURVEY:
            return Object.assign({}, state, {
                survey: action.payload
            });
        case REQUEST_START:
            if (action.payload === FETCH_SURVEY) {
                return Object.assign({}, state, {
                    isLoading: true
                });
            }   
            return state;
        case REQUEST_END:
            if (action.payload === FETCH_SURVEY) {
                return Object.assign({}, state, {
                    isLoading: false
                });
            }   
            return state;
        case REQUEST_ERROR:
            if (action.payload === FETCH_SURVEY) {
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