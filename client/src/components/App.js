import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//BrowserRouter is the brains of react-router -- it tells react router which components to show depending on the current url
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './landing/Landing';
import Dashboard from './Dashboard';
import PurchaseCredits from './PurchaseCredits';
import SurveyNew from './surveys/SurveyNew';
import Login from './login/Login';

import '../index.scss';



//BrowserRouter can have at most ONE child
class App extends Component {
    componentDidMount() { //prefered location to make AJAX requests
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={() => SurveyNew} />
                        <Route path="/purchase" component={PurchaseCredits} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Login} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
};

export default connect(null, actions)(App);