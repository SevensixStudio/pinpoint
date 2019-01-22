import axios from 'axios';
import { FETCH_USER } from './types';

//redux thunk inspects the value we return from an action creator 
//if it sees that we are returning a function instead of an action Redux thunk will
//automatically call the returned function and pass in the dispatch function as an argument
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};