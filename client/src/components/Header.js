import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                    <a class="left brand-logo">PinPoint</a>
                    <ul class="right">
                        <li>
                            <a>Login with Google</a>
                        </li>
                        <li>
                            <a>Login with Facebook</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;