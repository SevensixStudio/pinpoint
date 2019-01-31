import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
//BrowserRouter is the brains of react-router -- it tells react router which components to show depending on the current url
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './landing/Landing';
import Dashboard from './dashboard/Dashboard';
import PurchaseCredits from './purchaseCredits/PurchaseCredits';
import SurveyNew from './surveys/SurveyNew';
import Login from './login/Login';

import '../index.scss';

//BrowserRouter can have at most ONE child

const ProtectedRoute = ({component: Component, authed, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
    )
  }

class App extends Component {
    componentDidMount() { //prefered location to make AJAX requests
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Route exact path="/" component={this.props.auth === false ? Landing : Dashboard} />
                        <ProtectedRoute authed={this.props.auth !== false} exact path="/dashboard" component={Dashboard} />
                        <ProtectedRoute authed={this.props.auth !== false} path="/surveys/new" component={SurveyNew} />
                        <ProtectedRoute authed={this.props.auth !== false} path="/surveys/preview/:id" component={SurveyNew} />
                        <ProtectedRoute authed={this.props.auth !== false} path="/purchase" component={PurchaseCredits} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Login} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);