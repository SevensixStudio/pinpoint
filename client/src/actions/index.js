import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//redux thunk inspects the value we return from an action creator 
//if it sees that we are returning a function instead of an action Redux thunk will
//automatically call the returned function and pass in the dispatch function as an argument
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token, cost, credits) => async dispatch => {
    const res = await axios.post('/api/stripe', {token, cost, credits});
    //send updated user info (with added credits) to update header
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data }); //payload will be an array of current user's surveys 
};