import React from 'react';

import '../../index.scss';
import './CircleGraph.scss';

const CircleGraph = ({ color, value, total, label }) => {
    const progress = Math.round((value/total) * 100);
    return (
        <div className="CircleGraph">
            <svg viewBox="0 0 36 36" className={`CircleGraph--${color}`}>
            <path className="circle-bg"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="circle"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="18.6" className="percentage">{progress}%</text>
            <text x="18" y="21.75" className="label">{label}</text>
            </svg>
        </div>
    );
}

export default CircleGraph;