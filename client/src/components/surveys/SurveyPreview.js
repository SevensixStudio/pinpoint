import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey, submitSurvey } from '../../actions';

import PageHeader from '../pageHeader/PageHeader';
import YesNoStats from '../numberStats/YesNoStats';
import CircleGraph from '../circleGraph/CircleGraph';

import '../../index.scss';
import './SurveyPreview.scss';


class SurveyPreview extends Component {

    componentDidMount() {
        this.props.fetchSurvey(this.props.surveyId);
    }

    renderContent(survey) {
        if (survey === null) {
            return (
                <PageHeader text="Loading..." />
            );
        }
        return [
            <PageHeader text={survey.surveyName} />,
            <div className="SurveyPreview__preview">
                <div className="SurveyPreview__preview--email">
                    <div className="emailbox">
                        <p>From: {survey.fromEmail}</p>
                        <p>Subject: {survey.subject}</p>
                    </div>
                    <div className="emailBody">
                        <p>{survey.greeting}</p>
                        <p>{survey.body}</p>
                        <p className="question">{survey.question}</p>
                        <div className="answerBox">
                            <button className="btn btn--primaryDark">{survey.yesText}</button>
                            <button className="btn btn--primaryDark">{survey.noText}</button>
                        </div>
                        <p>{survey.goodbye}</p>
                        <p className="signature">{survey.signature}</p>
                    </div>
                </div>
                <div className="SurveyPreview__preview--stats">
                    <div className="graph">
                        <CircleGraph class="graph" color="primary" value={survey.yes + survey.no} total={survey.totalRecipients} label="response rate" />
                    </div> 
                    <div className="numbers"> 
                        <YesNoStats yesCount={survey.yes} noCount={survey.no} total={survey.totalRecipients}/>
                    </div> 
                </div>
            </div>,
            <div className="SurveyPreview__details">
                <p>Date Created: </p>
                <p>Date Sent: </p>
                <p>Date Last reply: </p>
                <p>Total recipients</p>
                <p>Recipients - toggle to see</p>
                <p>Edit</p>
                <p>Delete</p>
                <p>Send</p>
            </div>
        ];
    }

    render() {
        console.log(this.props);
        const  survey  = this.props.survey;
        return (
            <div className="SurveyPreview">
                {this.renderContent(survey)}
            </div>
        )
    }
}
  
function mapStateToProps({ survey }) {
    return { survey };
}

export default connect(mapStateToProps, { fetchSurvey, submitSurvey })(SurveyPreview);