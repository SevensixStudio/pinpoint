import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchFieldsFromSurvey } from '../../../actions';
import surveySteps from './surveySteps';
import PageHeader from '../../pageHeader/PageHeader';
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
          page: this.props.edit ? NUMBER_OF_PAGES : 1 
        }
      }

      componentDidMount() {
        if (this.props.surveyId) {
          this.props.fetchFieldsFromSurvey(this.props.surveyId);
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
              <PageHeader text={(this.props.edit && !_.isEmpty(this.props.state.formFields)) ? "Edit - " + this.props.state.formFields.surveyName: "Create a new survey" } />
              <div className="SurveyFormWizard__form">
                <WizardStep step={surveySteps[page]} isSaved={this.props.edit} onSubmit={page === NUMBER_OF_PAGES ? onSubmit : this.nextPage} previousPage={this.previousPage} stepNumber={page} numberOfSteps={NUMBER_OF_PAGES} />
              </div>
          </div>
        )
      }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}


SurveyFormWizard.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
  
export default connect(mapStateToProps, { fetchFieldsFromSurvey })(SurveyFormWizard);