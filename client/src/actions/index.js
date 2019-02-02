import axios from 'axios';
import { push } from 'react-router-redux';

import { 
    FETCH_USER, 
    FETCH_SURVEYS,
    RECEIVE_SURVEYS, 
    REQUEST_SURVEYS,
    ERROR_SURVEYS,
    FETCH_SURVEY, 
    FETCH_FORM_FIELDS,
 } from './types';

//redux thunk inspects the value we return from an action creator 
//if it sees that we are returning a function instead of an action Redux thunk will
//automatically call the returned function and pass in the dispatch function as an argument
export const fetchUser = () => async dispatch => {
    const { data } = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: data });
};

export const handleToken = (token, cost, credits) => async dispatch => {
    const { data } = await axios.post('/api/stripe', {token, cost, credits});
    //send updated user info (with added credits) to update header
    dispatch({ type: FETCH_USER, payload: data });
};

export const submitSurvey = (surveyId, history) => async dispatch => {
    console.log('sending');
    const all = await axios.post(`/api/surveys/send/${surveyId}`);
    console.log(all);
    // dispatch({ type: FETCH_USER, payload: data.user });
    // dispatch({ type: FETCH_SURVEY, payload: data.survey });
};

export const saveSurvey = (values, history) => async dispatch => {
    const { data } = await axios.post('/api/surveys/save', values);
    history.push(`/surveys/preview/${data._id}`);
    dispatch({ type: FETCH_SURVEY, payload: data});
}

// export const saveSurvey = (values, history) => async dispatch => {
    

//     // dispatch({ type: SEND_SURVEY_BEGIN });
//     // axios.post('/api/surveys/save', values)
//     //     .then(data => {
//     //         dispatch({ type: SEND_SURVEY_SUCCESS, payload: data });
//     //         dispatch({ type: FETCH_SURVEY, payload: data});
//     //         history.push(`/surveys/preview/${data._id}`);
//     //     })
//     //     .catch(error =>
//     //         dispatch({ type: SEND_SURVEY_FAILURE, payload: { error }})
//     //     );

//     // try {

//     //     const { data } = await axios.post('/api/surveys/save', values);
//     //     history.push(`/surveys/preview/${data._id}`);
//     //     dispatch({ type: SEND_SURVEY_SUCCESS, payload: data});
//     //     dispatch({ type: FETCH_SURVEY, payload: data});
//     // } catch (err) {
//     //     console.log('ERRROR');
//     //     console.log(err);
//     //     dispatch({ type: SEND_SURVEY_FAILURE, payload: { err }});
//     // }

//     // return dispatch => {
//     //     dispatch(fetchProductsBegin());
//     //     return fakeGetProducts()
//     //       .then(json => {
//     //         dispatch(fetchProductsSuccess(json.products));
//     //         return json.products;
//     //       })
//     //       .catch(error =>
//     //         dispatch(fetchProductsFailure(error))
//     //       );
//     //   };
//     }

export const updateSurvey = (id, values, history) => async dispatch => {
    const { data } = await axios.post(`/api/surveys/update/${id}`, values);
    history.push(`/surveys/preview/${data._id}`);
    dispatch({ type: FETCH_SURVEY, payload: data});
}

export const fetchFieldsFromSurvey = (id) => async dispatch => {
    const { data } = await axios.get(`/api/surveys/${id}`);
    const fields = {
        body: data.body,
        fromEmail: data.fromEmail,
        goodbye: data.goodbye,
        greeting: data.greeting,
        noText: data.noText,
        question: data.question,
        recipients: data.recipients.map(e => e.email).join(", "),
        signature: data.signature,
        subject: data.subject,
        surveyName: data.surveyName,
        yesText: data.yesText
    }
    dispatch({ type: FETCH_FORM_FIELDS, payload: fields });
}

export const fetchSurveys = () => async dispatch => {
    const { data } = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: data }); //payload will be an array of current user's surveys 
};

export const fetchSurvey = (surveyId) => async dispatch => {
   const { data } = await axios.get(`/api/surveys/${surveyId}`);
   dispatch({ type: FETCH_SURVEY, payload: data });
};

export const deleteSurvey = (surveyId, history) => async dispatch => {
    const { data } = await axios.delete(`/api/surveys/${surveyId}`);
    if (history !== (null || undefined)) {
        history.push('/dashboard');
    } else {
        dispatch(push('/dashboard')); 
    }
    dispatch({ type: FETCH_SURVEYS, payload: data });
}


//FETCH SURVEYS LIST
export const fetchSurveysTEST = () => { //TODO: change name
    return function(dispatch) {
        dispatch(requestSurveys());
        axios.get('/api/surveys')
            .then(res => {
                dispatch(receiveSurveys(res.data));
            })
            .catch(err => {
                console.log(err.message);
                dispatch(onRequestSurveysError(err.message));
            });
    }
}

const requestSurveys = () => {
    return {
        type: REQUEST_SURVEYS
    }
}

const receiveSurveys = (surveys) => {
    return {
        type: RECEIVE_SURVEYS,
        surveys,
        receivedAt: Date.now()
    }
}

const onRequestSurveysError = (errorMessage) => {
    return {
        type: ERROR_SURVEYS,
        errorMessage
    }
}