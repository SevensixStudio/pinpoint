import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FormField from '../formField/FormField';

const LoginForm = ({ inputs, onSubmit, buttonText, pristine, submitting }) => {
    function renderInputs() {
        const fields = [];
        for (let i = 0; i < inputs.length; i++) {
            fields.push(<Field key={inputs[i].name} component={FormField} {...inputs[i]} />);
        }
        return fields;
    }

   return (
        <form onSubmit={onSubmit}>
            {renderInputs()}
            <div>
                <button className="btn btn--primaryDark" type="submit" disabled={pristine || submitting}>{buttonText} &rarr;</button>
            </div>
        </form>
   );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
    form: 'login'
  })(LoginForm);