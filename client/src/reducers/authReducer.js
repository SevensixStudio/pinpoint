import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            //an empty string is interpretted as falsey value in JS
            //so if action.payload is "" then the statement below will return false
            return action.payload || false;
        default: 
            return state;
    }
}