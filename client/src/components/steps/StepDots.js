import React from 'react';

import '../../index.scss';
import './StepDots.scss';


const StepDots = ({ numberOfSteps, currentStep }) => {
    function renderSteps() {
        const rows = [];
        for (let i = 1; i <= numberOfSteps; i++) {
            let className = "StepDots__step";
            if (i === currentStep) {
                className += " StepDots__step--current";
            } else if (i < currentStep) {
                className += " StepDots__step--stepFinished";
            }
            rows.push(<span className={className} key={i}></span>);
        }
        return rows;
    }

    
    return (
        <div className="StepDots">
            {renderSteps()}
        </div>
    );
}

export default StepDots;