//start up redux side of things and render root component
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//TODO: Remove these two lines -- for dev only
import axios from 'axios';
window.axios = axios;

//create store
//first argument is all of the reducers in our app
//second argument is the initial state of the app - mostly relevant for server side rendering so not necessary for this app
//third arg, apply middleware call
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

    //1st arg - root component, 2nd arg - where we are attempting to render it in the dom
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);