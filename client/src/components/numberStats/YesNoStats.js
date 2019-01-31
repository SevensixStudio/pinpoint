import React from 'react';

import '../../index.scss';
import './YesNoStats.scss';

const YesNoStats = ({ yesCount, noCount, total}) => {
    return (
        <div className="YesNoStats">
            <p className="YesNoStats__label">Responses Recieved</p>
            <p className="YesNoStats__number number-1">{yesCount + noCount}</p>
            <p className="YesNoStats__label">Not responded</p>
            <p className="YesNoStats__number">{total - (yesCount + noCount)}</p>
        </div>
    );

};

export default YesNoStats;