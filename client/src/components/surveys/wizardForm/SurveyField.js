import React from 'react';

import '../../../index.scss';
import './SurveyField.scss';
                                
export default ({ input, label, type, meta: { error, touched } }) => {
    
    return (
        <div className="SurveyField">
            {touched && error && <span className="SurveyField__error">{error}</span>}
            {(() => {
                if (type === "textarea") {
                    return <textarea className="SurveyField__input SurveyField__input--textarea" {...input} placeholder={label} type={type} />
                } 
                return <input className="SurveyField__input" {...input} placeholder={label} type={type} />
            })()}
            <label className="SurveyField__label">{label}</label>
        </div>
    );
};