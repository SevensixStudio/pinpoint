import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/types';

                        //reducer will be returing a list of surveys
                        //default should be an empty array 
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        case DELETE_SURVEY: 
            return action.payload;
        default: 
            return state;
    }
}