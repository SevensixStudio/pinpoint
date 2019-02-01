import { FETCH_FORM_FIELDS } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_FORM_FIELDS:
            return action.payload;
        default: 
            return state;
    }
}