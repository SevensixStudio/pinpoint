import _ from 'lodash';
import React, { Component } from 'react';
//import helper from redux form and tell it to control any forms in this component
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, field => {
            return <Field key={field.name} component={SurveyField} type="text" {...field} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys">
                        Cancel
                    </Link>
                    <button type="submit">
                        Preview
                        <i>done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    
    errors.recipients = validateEmails(values.emails || '');

    _.each(formFields, ({ name, errorMessage }) => {
        if (!values[name]) {
            errors[name] = errorMessage;
        }
    });
  

    return errors; //if redux form gets this error object back and its empty then redux form is valid
}

export default reduxForm({
    validate,
    form: 'surveyForm',//form name in the event that we have many different forms in our app
    destroyOnUnmount: false //automatically set to true -- setting to false will instruct redux form to store the form values
})(SurveyForm);