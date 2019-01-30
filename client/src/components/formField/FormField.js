import React from 'react';

import '../../index.scss';
import './FormField.scss';
                                
export default ({ input, label, type, meta: { error, touched } }) => {
    
    return (
        <div className="FormField">
            {touched && error && <span className="FormField__error">{error}</span>}
            {(() => {
                if (type === "textarea") {
                    return <textarea className="FormField__input FormField__input--textarea" {...input} placeholder={label} type={type} />
                } 
                return <input className="FormField__input" {...input} placeholder={label} type={type} />
            })()}
            <label className="FormField__label">{label}</label>
        </div>
    );
};