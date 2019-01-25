import { FETCH_SURVEYS } from '../actions/types';

                        //reducer will be returing a list of surveys
                        //default should be an empty array 
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default: 
            return state;
    }
}