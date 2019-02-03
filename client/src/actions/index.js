import { 
    ASYNC_REQUEST,
    REQUEST_START,
    ACCESS_DENIED,
    REQUEST_END,
    REQUEST_ERROR,
    FETCH_SURVEYS,
    SET_SURVEYS,
    FETCH_USER, 
    SET_USER,
    FETCH_SURVEY, 
    SET_SURVEY,
    FETCH_FORM_FIELDS,
    SET_FORM_FIELDS,
    HANDLE_TOKEN,
    PAYMENT_SUCCESSFUL,
    SAVE_SURVEY,
    SAVE_SUCCESSFUL,
    SEND_SURVEY,
    SEND_SUCCESSFUL,
    DELETE_SURVEY,
    DELETE_SUCCESSFUL
 } from './types';

 function requestAction({
    url = "",
    method = "GET",
    data = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = ""
  }) {
    return {
      type: ASYNC_REQUEST,
      payload: {
        url,
        method,
        data,
        onSuccess,
        onFailure,
        label
      }
    };
}

export const accessDenied = url => ({
    type: ACCESS_DENIED,
    payload: { url }
});

export const onRequestError = (label, error) => ({
    type: REQUEST_ERROR,
    error,
    payload: label
});

export const requestStart = label => ({
    type: REQUEST_START,
    payload: label
});

export const requestEnd = label => ({
    type: REQUEST_END,
    payload: label
});

/////////////////User
export const fetchUser = () => requestAction({
    url: '/api/current_user',
    onSuccess: setUser,
    label: FETCH_USER
})

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

/////////////////Surveys
export const fetchSurveys = () => requestAction({
    url: '/api/surveys',
    onSuccess: setSurveys,
    label: FETCH_SURVEYS
 });

function setSurveys(surveys) {
    return {
      type: SET_SURVEYS,
      payload: surveys
    };
}

/////////////////Single Survey
export const fetchSurvey = (surveyId) => requestAction({
    url: `/api/surveys/${surveyId}`,
    onSuccess: setSurvey,
    label: FETCH_SURVEY
});

const setSurvey = (survey) => {
    return {
        type: SET_SURVEY,
        payload: survey
    };
}

/////////////////Survey Form Fields
export const fetchFieldsFromSurvey = (surveyId) => requestAction({
    url: `/api/surveys/${surveyId}`,
    onSuccess: setFieldsFromSurvey,
    label: FETCH_FORM_FIELDS
});

const setFieldsFromSurvey = (survey) => {
    const fields = {
        body: survey.body,
        fromEmail: survey.fromEmail,
        goodbye: survey.goodbye,
        greeting: survey.greeting,
        noText: survey.noText,
        question: survey.question,
        recipients: survey.recipients.map(e => e.email).join(", "),
        signature: survey.signature,
        subject: survey.subject,
        surveyName: survey.surveyName,
        yesText: survey.yesText
    }
    return {
        type: SET_FORM_FIELDS,
        payload: fields
    };
}

/////////////////Handle payment Token
export const handleToken = (token, cost, credits) => requestAction({
    url: '/api/stripe',
    method: "POST",
    data: { token, cost, credits },
    onSuccess: setPaymentSuccessful,
    label: HANDLE_TOKEN
});

const setPaymentSuccessful = (user) => {
    return (
        { type: PAYMENT_SUCCESSFUL },
        setUser(user)
    );
}


/////////////////Save survey
export const saveSurvey = (values) => requestAction({
    url: '/api/surveys/save',
    method: "POST",
    data: values,
    onSuccess: setSaveSuccessful,
    label: SAVE_SURVEY
});

const setSaveSuccessful = (survey) => {
    return {
        type: SAVE_SUCCESSFUL,
        payload: survey._id
    };
}


/////////////////Update survey
export const updateSurvey = (id, values) => requestAction({
    url: `/api/surveys/update/${id}`,
    method: "POST",
    data: values,
    onSuccess: setSaveSuccessful,
    label: SAVE_SURVEY
});


/////////////////Send survey
export const sendSurvey = (surveyId) => requestAction({
    url: `/api/surveys/send/${surveyId}`,
    method: "POST",
    onSuccess: setSendSuccessful,
    label: SEND_SURVEY
});

const setSendSuccessful = ({ survey, user }) => {
    return (
        { type: SEND_SUCCESSFUL, payload: survey._id},
        setUser(user)
    );
}

/////////////////Delete Survey
export const deleteSurvey = (surveyId, isPreview) => requestAction({
    url: (isPreview ? `/api/surveys/${surveyId}` : `/api/surveys/list/${surveyId}`),
    method: "DELETE",
    onSuccess: (isPreview ? setDeleteSuccessful : setDeleteSuccessfulList),
    label: DELETE_SURVEY
});

const setDeleteSuccessful = () => {
    return (
        { type: DELETE_SUCCESSFUL }
    );
}

const setDeleteSuccessfulList = (surveys) => {
    return (
        { type: DELETE_SUCCESSFUL },
        setSurveys(surveys)
    );
}