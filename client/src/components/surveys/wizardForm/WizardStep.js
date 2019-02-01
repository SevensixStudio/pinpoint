import _ from 'lodash';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../utils/validate';
import FormField from '../../formField/FormField';
import StepDots from '../../steps/StepDots';

import '../../../index.scss';
import './WizardStep.scss';

const WizardStep = ({step, handleSubmit, stepNumber, numberOfSteps, previousPage, pristine, submitting}) => {
    
    return (
        <div className="WizardStep">
            <h3 className="WizardStep__title">{step.title}</h3>
            <p className="WizardStep__message">{step.message}</p>
            <form className="WizardStep__form" onSubmit={handleSubmit}>
                <div className="WizardStep__form--fields">
                    {_.map(step.fields, field => {
                        return <Field key={field.name} component={FormField} {...field} />
                    })}
                </div>
                <div className="WizardStep__form--buttons">
                    {(() => {
                        if (stepNumber === 1) {
                            return [
                                <button className="btn button--previous hidden" key="1" type="button" onClick={previousPage}><i className="fas fa-fa-chevron-left"></i> Previous</button>,
                                <button className="btn button--next" key="2" type="submit">Next <i className="fas fa-chevron-right"></i></button>
                            ]
                            } else if (stepNumber === numberOfSteps) {
                            return [
                                <button className="btn button--previous" key="1" type="button" onClick={previousPage}><i className="fas fa-fa-chevron-left"></i> Previous</button>,
                                <button className="btn button--submit" key="2" type="submit" disabled={pristine || submitting}>Save &amp; preview <i className="far fa-save"></i></button>
                            ];
                        } else {
                        return [
                                <button className="btn button--previous" key="1" type="button" onClick={previousPage}><i className="fas fa-chevron-left"></i> Previous</button>,
                                <button className="btn button--next" key="2" type="submit">Next <i className="fas fa-chevron-right"></i></button>
                        ]
                        }
                    })()}
                    <div className="button--stepdots">
                        <StepDots numberOfSteps={numberOfSteps} currentStep={stepNumber} />
                    </div>
                </div>
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