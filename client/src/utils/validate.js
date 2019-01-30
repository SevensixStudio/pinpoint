import _ from 'lodash';
import surveySteps from '../components/surveys/wizardForm/surveySteps';
import { validateEmails, validateEmail} from './emailValidator';

const validate = values => {
    const errors = {};
    
    errors.recipients = validateEmails(values.recipients || '');
    errors.fromEmail = validateEmail(values.fromEmail || '');

    for (const index in surveySteps) {
        _.each(surveySteps[index].fields, ({ name, errorMessage }) => {
            if (!values[name]) {
                errors[name] = errorMessage;
            }
        });
    }

    return errors; //if redux form gets this error object back and its empty then redux form is valid
}
  
export default validate;