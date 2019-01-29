import React, { Component } from 'react';
import Header from '../header/Header';
import SurveyFormWizard from './wizardForm/SurveyFormWizard'; 

import '../../index.scss';
import './SurveyNew.scss';

class SurveyNew extends Component {
    onSubmit() {
        console.log('ALL DONE');
    }

    render() {
        return (
            <div className="surveyNew-container SurveyNew">
                <Header />
                <SurveyFormWizard onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default SurveyNew;