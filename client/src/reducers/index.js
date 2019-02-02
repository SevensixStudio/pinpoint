//caling this file index.js makes it easier to import
import { combineReducers } from 'redux';
//import reducer function from redux-form and rename it to reduxFrorm
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import surveyReducer from './surveyReducer';
import fieldsReducer from './fieldsReducer';

export default combineReducers({
    //declare that the auth piece of state is being manufactured by the authReducer
    auth: authReducer,
    //redux form has to be assigned to a specific key called form
    form: reduxForm,
    surveyList: surveysReducer,
    survey: surveyReducer,
    formFields: fieldsReducer
});