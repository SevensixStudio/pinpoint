import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Header from '../header/Header';
import SurveyFormWizard from './wizardForm/SurveyFormWizard'; 

import '../../index.scss';

const SurveyNew = ({ submitSurvey, history }) => {

        return (
            <div className="surveyNew-container">
                <Header linkText="Dashboard" linkHref="/dashboard" />
                <SurveyFormWizard onSubmit={(formValues) => submitSurvey(formValues, history)} />
            </div>
        );
    
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, actions)(SurveyNew);