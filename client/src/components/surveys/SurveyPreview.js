import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey, submitSurvey, deleteSurvey } from '../../actions';

import PageHeader from '../pageHeader/PageHeader';
import YesNoStats from '../numberStats/YesNoStats';
import CircleGraph from '../circleGraph/CircleGraph';

import '../../index.scss';
import './SurveyPreview.scss';


class SurveyPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRecipients: false
        }
    }
      
    componentDidMount() {
        this.props.fetchSurvey(this.props.surveyId);
    }

    toggleRecipientsList() {
        this.setState({ showRecipients: this.state.showRecipients ? false : true});
    }

    renderRecipients(recipients) {
        return (
            <div className="recipientsList">
                <p>{recipients.map(e => e.email).join(", ")}</p>
            </div>
        )
    }

    renderToolbar(isDraft, className) {
        if (isDraft) {
            return (
                <div className={className}>
                    <div>
                        <a id="edit" href={`/surveys/edit/${this.props.surveyId}`}><i className="far fa-edit"></i></a>
                    </div>
                    <div onClick={() => this.props.submitSurvey(this.props.surveyId, this.props.history)}>
                        <i className="far fa-envelope"></i>
                    </div>
                    <div onClick={() => this.props.deleteSurvey(this.props.surveyId, this.props.history)}>
                        <i className="far fa-trash-alt"></i>
                    </div>
                </div>
            );
        }
        return (
            <div className={className}>
                <div onClick={() => this.props.deleteSurvey(this.props.surveyId, this.props.history)}>
                    <i className="far fa-trash-alt"></i>
                </div>
            </div>
        )
    }

    renderContent(survey) {
        if (_.isEmpty(survey)) {
            return (
                <PageHeader text="Loading..." />
            );
        }
        return [
            <PageHeader key="header" text={`${survey.surveyName} - Preview`} />,
            <div key="preview" className="SurveyPreview__preview">
                {this.renderToolbar(survey.isDraft, "SurveyPreview__preview--toolbar")}
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
                    {survey.isDraft ? (<button onClick={() => this.props.submitSurvey(this.props.surveyId, this.props.history)} className="btn btn--yellow"><i className="far fa-envelope"></i> Send now</button>) : null} 
                </div>
            </div>,
            <div key="details" className="SurveyPreview__details">
                <div className="SurveyPreview__details--info">
                    <div className="SurveyPreview__details--dates">
                        <p>Date Created: {new Date(survey.dateCreated).toLocaleDateString() + " " + new Date(survey.dateCreated).toLocaleTimeString()}</p>
                        {survey.dateUpdated ? (<p>Date last updated: {new Date(survey.dateUpdated).toLocaleDateString() + " " + new Date(survey.dateUpdated).toLocaleTimeString()}</p>) : null}
                        {survey.isDraft ? (<p>This survey has not been sent yet</p>) : (<p>Date Sent: {new Date(survey.dateSent).toLocaleDateString() + " " + new Date(survey.dateSent).toLocaleTimeString()}</p>)}
                        {survey.isDraft ? null : (survey.lastResponded ? (<p>Date Last reply: {new Date(survey.lastResponded).toLocaleDateString() + " at " + new Date(survey.lastResponded).toLocaleTimeString()}</p>) : (<p>No one has responded to your survey yet.</p>))}
                    </div>
                    <div className="SurveyPreview__details--recipients">
                        <p>Total recipients: {survey.totalRecipients}</p>
                        <button className="login-btn" onClick={() => this.toggleRecipientsList()}>Click to view recipients</button>
                        {this.state.showRecipients ? this.renderRecipients(survey.recipients) : null}
                    </div>
                </div>
                {this.renderToolbar(survey.isDraft, "SurveyPreview__details--toolbar SurveyPreview__preview--toolbar")}
            </div>
        ];
    }

    render() {
        const  survey  = this.props.survey;
        return (
            <div className="SurveyPreview">
                {this.renderContent(survey)}
            </div>
        )
    }
}
  
function mapStateToProps({ survey }, state) {
    return { survey, state };
}

export default connect(mapStateToProps, { fetchSurvey, submitSurvey, deleteSurvey })(SurveyPreview);