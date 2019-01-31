import _ from 'lodash';
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
        console.log(survey);
        if (_.isEmpty(survey)) {
            return (
                <PageHeader text="Loading..." />
            );
        }
        return [
            <PageHeader text={`${survey.surveyName} - Preview`} />,
            <div className="SurveyPreview__preview">
                <div className="SurveyPreview__preview--toolbar">
                    <div>
                        <i class="far fa-edit"></i>
                    </div>
                    <div>
                        <i class="far fa-envelope"></i>
                    </div>
                    <div>
                        <i class="far fa-trash-alt"></i>
                    </div>
                </div>
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
                <div className="SurveyPreview__details--info">
                    <div className="SurveyPreview__details--dates">
                        <p>Date Created: {new Date(survey.dateSent).toLocaleDateString() + " " + new Date(survey.dateSent).toLocaleTimeString()}</p>
                        <p>Date Sent: {new Date(survey.dateSent).toLocaleDateString() + " " + new Date(survey.dateSent).toLocaleTimeString()}</p>
                        <p>Date Last reply: {survey.lastResponded ? (new Date(survey.lastResponded).toLocaleDateString() + " at " + new Date(survey.lastResponded).toLocaleTimeString()) : 'NA'}</p>
                    </div>
                    <div className="SurveyPreview__details--recipients">
                        <p>Total recipients: {survey.totalRecipients}</p>
                        <button className="login-btn">Click to view recipients</button>
                        <div className="recipientsList">
                            <p>{survey.recipients.map(e => e.email).join(", ")}</p>
                        </div>
                    </div>
                </div>
                
                <div className="SurveyPreview__details--toolbar SurveyPreview__preview--toolbar">
                    <div>
                        <i class="far fa-edit"></i>
                    </div>
                    <div>
                        <i class="far fa-envelope"></i>
                    </div>
                    <div>
                        <i class="far fa-trash-alt"></i>
                    </div>
                </div>
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

{/* <p>{(survey.recipients).map(function(recipient){ return recipient.email; }).join(', ')}</p> */}