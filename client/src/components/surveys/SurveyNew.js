import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Header from '../header/Header';
import SurveyFormWizard from './wizardForm/SurveyFormWizard'; 

import '../../index.scss';
import SurveyPreview from './SurveyPreview';

const SurveyNew = ({ match: { path, params }, saveSurvey, updateSurvey, history }) => {
        return (
            <div className="surveyNew-container">
                <Header linkText="Dashboard" linkHref="/dashboard" />
                {(() => {
                    if (path === '/surveys/new') {
                        return <SurveyFormWizard edit={false} onSubmit={(formValues) => saveSurvey(formValues, history)} />;
                    } else if (path.includes("edit")) {
                        return <SurveyFormWizard edit={true} onSubmit={(formValues) => updateSurvey(params.id, formValues, history)} surveyId={params.id} />
                    }
                    return <SurveyPreview surveyId={params.id} history={history} />     
                })()}
            </div>
        );
    
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, actions)(SurveyNew);