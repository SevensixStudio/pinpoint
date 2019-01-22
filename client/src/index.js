//start up redux side of things and render root component
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

//create store
//first argument is all of the reducers in our app
//second argument is the initial state of the app - mostly relevant for server side rendering so not necessary for this app
//third arg, apply middleware call
const store = createStore(() => [], {}, applyMiddleware());

    //1st arg - root component, 2nd arg - where we are attempting to render it in the dom
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);