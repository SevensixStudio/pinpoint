import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import surveySteps from './surveySteps';
import WizardStep from './WizardStep';
import StepDots from '../../steps/StepDots';

import '../../../index.scss';


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
            <div>
                <div className="SurveyNew__title">
                Create a new survey
                <hr />
                </div>
                <div className="SurveyNew__form">
                  <WizardStep step={surveySteps[page]} onSubmit={this.nextPage} previousPage={this.previousPage} isFirst={page === 1} isLast={page === 6}/>
                </div>
            
          </div>
        )
      }
}

SurveyFormWizard.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
  
export default SurveyFormWizard;


