import {
    SAVE_SUCCESSFUL, 
    SAVE_SURVEY,
    REQUEST_START,
    REQUEST_END,
    REQUEST_ERROR,
 } from '../actions/types';

 const INITIAL_STATE = {
     isSaving: false,
     isError: false,
     errorMessage: '',
     saveSuccessful: false,
     surveyId: ''
 }

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SAVE_SUCCESSFUL:
            return Object.assign({}, state, {
                saveSuccessful: true,
                surveyId: action.payload
            });
        case REQUEST_START:
            if (action.payload === SAVE_SURVEY) {
                return Object.assign({}, state, {
                    isSaving: true
                });
            }   
            return state;
        case REQUEST_END:
            if (action.payload === SAVE_SURVEY) {
                return Object.assign({}, state, {
                    isSaving: false
                });
            }   
            return state;
        case REQUEST_ERROR:
            if (action.payload === SAVE_SURVEY) {
                return Object.assign({}, state, {
                    isSaving: false,
                    isError: true,
                    errorMessage: action.error
                });
            }   
            return state;
        default: 
            return state;
    }
}