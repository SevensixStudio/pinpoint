import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../logo/Logo';

import '../../index.scss';
import './Header.scss';

class Header extends Component {
    
    renderContent() {
       switch (this.props.auth) {
           case null:
                return;
           case false:
                return [
                    <li className="Header__nav--item" key="1"><a className="Header__nav--item--text" href="/login">Login</a></li>,
                    <li className="Header__nav--item" key="2"><a className="btn btn--yellow" href="/signup">Sign up for free</a></li>
                ];
           default: 
                return [
                    <li className="Header__nav--item" key="1"><Link to="/purchase">Add credits</Link></li>,
                    <li className="Header__nav--item" key="2">Credits: {this.props.auth.credits}</li>,
                    <li className="Header__nav--item" key="3"><a href="/api/logout">Logout</a></li>
                ];
       }
    }

    render() {
        return (
            <nav className="Header">
                <Logo className="Header__logo" logoClass="logo--header"/>
                <ul className="Header__nav">
                    {this.renderContent()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);