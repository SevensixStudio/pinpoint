import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    //iniialize component level state
    // constructor(props) {
    //     super(props);
    //     this.state = { new: true };
    // }
    //can be shortened to:
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview) {
            return <SurveyFormReview onEditClicked={() => this.setState({ showReview: false })}/>;
        }
        return <SurveyForm onSurveySubmit={() => this.setState({ showReview: true })}/>
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm' //clears out form feilds when navigate away
})(SurveyNew);
