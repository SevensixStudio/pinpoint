import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import surveyReducer from './surveyReducer';
import fieldsReducer from './fieldsReducer';
import paymentReducer from './paymentReducer';
import saveReducer from './saveReducer';
import sendReducer from './sendReducer';
import deleteReducer from './deleteReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveyList: surveysReducer,
    survey: surveyReducer,
    formFields: fieldsReducer,
    payment: paymentReducer,
    saveStatus: saveReducer,
    sendStatus: sendReducer,
    deleteStatus: deleteReducer
});