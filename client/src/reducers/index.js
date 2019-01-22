//caling this file index.js makes it easier to import
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    //declare that the auth piece of state is being manufactured by the authReducer
    auth: authReducer
});