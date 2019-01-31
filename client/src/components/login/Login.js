import React, { Component } from 'react';
import { connect } from 'react-redux';

import Logo from  '../logo/Logo';
import LoginForm from './LoginForm';

import '../../index.scss';
import './Login.scss';
import loginInputs from './loginInputs';


class Login extends Component {

    renderMessage() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                if (this.props.location.pathname === '/signup') {
                    return <p className="Login__message">Welcome! Sign up now and send<br />your first survey for free.</p>; 
                }
                return <p className="Login__message">Welcome Back!</p>;
            default:
                 return(
                    <p className="Login__message">You are already logged in. Would you like <br />to sign in with a different accont?</p>
                 ); 
        }
    }

    handleSubmit() {
        console.log('LOGGING IN...');
    }

    render() {
        const isSignUp = (this.props.location.pathname === '/signup' && !this.props.auth);
        return (
            <div className="login-container">
                <div className="Login">
                    <Logo className="Login__logo" logoClass="logo--big" />
                    {this.renderMessage()}
                    <div className="Login__formContainer">
                        <LoginForm inputs={isSignUp ? loginInputs : [loginInputs[0], loginInputs[1]] } onSubmit={this.handleSubmit} buttonText={isSignUp ? 'Sign up' : 'Login'} />
                    </div>
                    <p className="Login__or-text">or</p>
                    <div className="Login__login-with">
                        <a href="/auth/google" className="login-btn"><i className="fab fa-google"></i> Sign {isSignUp ? 'up ' : 'in '} with Google</a>
                        <a href="/auth/facebook" className="login-btn"><i className="fab fa-facebook-f"></i> Sign {isSignUp ? 'up ' : 'in '} with Facebook</a>
                    </div>
                    {isSignUp ? (<p className="Login__create-account">Already have an account? &nbsp;<a href="/login" className="inline-link">Login</a></p>) 
                        : (<p className="Login__create-account">Don't have an account? &nbsp;<a href="/api/logoutsignup" className="inline-link">Create one</a></p>)
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Login);