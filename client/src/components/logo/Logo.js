import React from 'react';
import { Link } from 'react-router-dom';

import '../../index.scss';

const Logo = ({ logoClass }) => {
    return (
        <Link to={'/'} className="logo">
            <div className={logoClass}>
                <span className={`logo--icon ${logoClass}--logo`}>
                    <i className="fas fa-icicles fa-rotate-90"></i>
                </span>
                <span className={`logo--text ${logoClass}--text`}>PinPoint</span>
            </div>
        </Link>
    );
};

export default Logo;