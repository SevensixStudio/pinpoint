import _ from 'lodash';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../utils/validate';
import SurveyField from './SurveyField';

const WizardStep = ({step, handleSubmit, isFirst, isLast, previousPage, pristine, submitting}) => {
    return (
        <div>
            {step.message}
            <form onSubmit={handleSubmit}>
                {_.map(step.fields, field => {
                    return <Field key={field.name} component={SurveyField} {...field} />
                })}
                {(() => {
                    if (isFirst) {
                        return <button type="submit">Next</button>;
                    } else if (isLast) {
                        return [
                            <button key="1" type="button" className="previous" onClick={previousPage}>Previous</button>,
                            <button key="2" type="submit" disabled={pristine || submitting}>Send</button>
                        ];
                    } else {
                       return [
                            <button key="1" type="button" className="previous" onClick={previousPage}>Previous</button>,
                            <button key="2" type="submit">Next</button>
                       ]
                    }
                })()}
            </form>
        </div>
    );
  }
  
  export default reduxForm({
    form: 'surveyWizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
  })(WizardStep);