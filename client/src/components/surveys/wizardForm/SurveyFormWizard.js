import React, { Component } from 'react';
import PropTypes from 'prop-types'
import surveySteps from './surveySteps';
import WizardStep from './WizardStep';

import '../../../index.scss';
import './SurveyFormWizard.scss';

const NUMBER_OF_PAGES = 6;


class SurveyFormWizard extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
          page: 1
        }
      }

      nextPage() {
        this.setState({ page: this.state.page + 1 });
      }
    
      previousPage() {
        this.setState({ page: this.state.page - 1 });
      }

      render() {
        const { onSubmit } = this.props;
        const { page } = this.state;
        return (
            <div className="SurveyFormWizard">
              <div className="SurveyFormWizard__title">
                Create a new survey
                <hr />
              </div>
              <div className="SurveyFormWizard__form">
                <WizardStep step={surveySteps[page]} onSubmit={page === NUMBER_OF_PAGES ? onSubmit : this.nextPage} previousPage={this.previousPage} stepNumber={page} numberOfSteps={NUMBER_OF_PAGES} />
              </div>
          </div>
        )
      }
}

SurveyFormWizard.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
  
export default SurveyFormWizard;