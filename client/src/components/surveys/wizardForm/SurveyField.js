import React from 'react';
                                //nested destructuring
export default ({ input, label, type, meta: { error, touched } }) => {
    //pass all of the properties into html input using...input -- carries over all key/value pairs
    return (
        <div>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type} style={{ marginBottom: '5px' }} />
            <div style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};