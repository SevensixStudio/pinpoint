import React, { Component } from 'react';
import { connect } from 'react-redux';

import Logo from  '../logo/Logo';

import '../../index.scss';
import './Login.scss';

class Login extends Component {

    renderMessage() {
        console.log(this.props.auth);
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

    renderRepeatPassword() {
        return (
            <div className="Login__form--group">
                <input type="password" className="Login__form--group--input" placeholder="Repeat Password" id="repeatPassword" required />
                <label htmlFor="repeatPassword" className="Login__form--group--label">Repeat Password</label>
            </div>
        );
    }

    render() {
        const isSignUp = (this.props.location.pathname === '/signup' && !this.props.auth);
        return (
            <div className="login-container">
                <div className="Login">
                    <Logo className="Login__logo" logoClass="logo--big" />
                    {this.renderMessage()}
                    <form action="#" className="Login__form">
                        <div className="Login__form--group">
                            <input type="email" className="Login__form--group--input" placeholder="Email" id="email" required />
                            <label htmlFor="email" className="Login__form--group--label">Email</label>
                        </div>
                        <div className="Login__form--group">
                            <input type="password" className="Login__form--group--input" placeholder="Password" id="password" required />
                            <label htmlFor="password" className="Login__form--group--label">Password</label>
                        </div>
                        {isSignUp ? this.renderRepeatPassword() : null}
                        <div className="Login__form--group">
                            <button className="btn btn--primaryDark">{isSignUp ? 'Sign up' : 'Login'} &rarr;</button>
                        </div>
                    </form>
                    <p className="Login__or-text">or</p>
                    <div className="Login__login-with">
                        <a href="/auth/google" className="login-btn"><i className="fab fa-google"></i> Sign {isSignUp ? 'up ' : 'in '} with Google</a>
                        <a href="/auth/facebook" className="login-btn"><i className="fab fa-facebook-f"></i> Sign {isSignUp ? 'up ' : 'in '} with Facebook</a>
                    </div>
                    {isSignUp ? null : (
                        <p className="Login__create-account">Don't have an account? &nbsp;<a href="/api/logoutsignup" className="inline-link">Create one</a></p>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Login);