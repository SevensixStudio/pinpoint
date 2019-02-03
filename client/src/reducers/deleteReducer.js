import {
    DELETE_SUCCESSFUL, 
    DELETE_SURVEY,
    REQUEST_START,
    REQUEST_END,
    REQUEST_ERROR,
 } from '../actions/types';

 const INITIAL_STATE = {
     isDeleting: false,
     isError: false,
     errorMessage: '',
     deleteSuccessful: false,
 }

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DELETE_SUCCESSFUL:
            return Object.assign({}, state, {
                deleteSuccessful: true
            });
        case REQUEST_START:
            if (action.payload === DELETE_SURVEY) {
                return Object.assign({}, state, {
                    isDeleting: true
                });
            }   
            return state;
        case REQUEST_END:
            if (action.payload === DELETE_SURVEY) {
                return Object.assign({}, state, {
                    isDeleting: false
                });
            }   
            return state;
        case REQUEST_ERROR:
            if (action.payload === DELETE_SURVEY) {
                return Object.assign({}, state, {
                    isDeleting: false,
                    isError: true,
                    errorMessage: action.error
                });
            }   
            return state;
        default: 
            return state;
    }
}