import { 
    SET_SURVEYS,
    REQUEST_START,
    REQUEST_END,
    FETCH_SURVEYS,
    REQUEST_ERROR,
    UPDATE_ITEM_SURVEYS_LIST } from '../actions/types';

const INITIAL_STATE = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    surveys: []
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_SURVEYS:
            return Object.assign({}, state, {
                surveys: action.payload
            });
        case REQUEST_START:
            if (action.payload === FETCH_SURVEYS) {
                return Object.assign({}, state, {
                    isLoading: true
                });
            }
            return state;
        case REQUEST_END:
            if (action.payload === FETCH_SURVEYS) {
                return Object.assign({}, state, {
                    isLoading: false
                });
            }
            return state;
        case REQUEST_ERROR:
            if (action.payload === FETCH_SURVEYS) {
                return Object.assign({}, state, {
                    isLoading: false,
                    isError: true,
                    errorMessage: action.error
                });
            }
            return state;
        case UPDATE_ITEM_SURVEYS_LIST: 
            const index = state.surveys.findIndex(x => x._id == action.payload._id);
            state.surveys[index] = action.payload;
            return Object.assign({}, state, {
                surveys: state.surveys
            });
        default: 
            return state;
    }
}