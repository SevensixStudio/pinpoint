import { RECEIVE_SURVEYS, REQUEST_SURVEYS, ERROR_SURVEYS, FETCH_SURVEYS } from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isError: false,
    errorMessage: '',
    surveys: []
}
export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_SURVEYS:
            return Object.assign({}, state, { 
                isFetching: true
            }); 
        case RECEIVE_SURVEYS:
            return Object.assign({}, state, { 
                isFetching: false,
                surveys: action.surveys
            });
        case ERROR_SURVEYS: 
            return Object.assign({}, state, {
                isFetching: false,
                isError: true,
                errorMessage: action.errorMessage
            })
        case FETCH_SURVEYS:  //TODO: Delete
            return Object.assign({}, state, { 
                isFetching: false,
                surveys: action.surveys
            });
        default: 
            return state;
    }
}