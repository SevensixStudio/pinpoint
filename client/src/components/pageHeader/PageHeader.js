import React from 'react';

import '../../index.scss';
import './PageHeader.scss';

const PageHeader = ({ text }) => {
    return (
        <div className="PageHeader">
            <h3 className="PageHeader__text">{text}</h3>
            <hr className="PageHeader__line" />
        </div>
    );
};

export default PageHeader;