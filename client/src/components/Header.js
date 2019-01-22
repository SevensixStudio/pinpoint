import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
       switch (this.props.auth) {
           case null:
                return;
           case false:
                return (
                    <ul className="right">
                        <li><a href="/auth/google">Login with Google</a></li>
                        <li><a href="/auth/facebook">Login with Facebook</a></li>
                    </ul>
                );
           default: 
                return (
                    <ul className="right">
                        <li><a href="/api/logout">Logout</a></li>
                    </ul>
                );
       }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/' } 
                        className="left brand-logo">PinPoint</Link>
                    {this.renderContent()}
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);