import { 
    SEND_SURVEY,
    SEND_SUCCESSFUL,
    REQUEST_START,
    REQUEST_END,
    REQUEST_ERROR,
 } from '../actions/types';

 const INITIAL_STATE = {
     isSending: false,
     isError: false,
     errorMessage: '',
     sendSuccessful: false,
     surveyId: ''
 }

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEND_SUCCESSFUL:
            return Object.assign({}, state, {
                sendSuccessful: true,
                surveyId: action.payload
            });
        case REQUEST_START:
            if (action.payload === SEND_SURVEY) {
                return Object.assign({}, state, {
                    isSending: true
                });
            }   
            return state;
        case REQUEST_END:
            if (action.payload === SEND_SURVEY) {
                return Object.assign({}, state, {
                    isSending: false
                });
            }   
            return state;
        case REQUEST_ERROR:
            if (action.payload === SEND_SURVEY) {
                return Object.assign({}, state, {
                    isSending: false,
                    isError: true,
                    errorMessage: action.error
                });
            }   
            return state;
        default: 
            return state;
    }
}