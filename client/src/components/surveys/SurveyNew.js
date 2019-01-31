import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Header from '../header/Header';
import SurveyFormWizard from './wizardForm/SurveyFormWizard'; 

import '../../index.scss';
import SurveyPreview from './SurveyPreview';

const SurveyNew = ({ match: { path, params }, submitSurvey, history }) => {
        return (
            <div className="surveyNew-container">
                <Header linkText="Dashboard" linkHref="/dashboard" />
                {(() => {
                    if (path === '/surveys/new') {
                        return <SurveyFormWizard onSubmit={(formValues) => submitSurvey(formValues, history)} />;
                    }
                    return <SurveyPreview surveyId={params.id} />     
                })()}
            </div>
        );
    
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, actions)(SurveyNew);