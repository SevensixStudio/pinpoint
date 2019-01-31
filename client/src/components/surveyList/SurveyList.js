import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import CircleGraph from '../circleGraph/CircleGraph';

import '../../index.scss';
import './SurveyList.scss';

class SurveyList extends Component {
    componentDidMount() {
        if (this.props.auth) {
            this.props.fetchSurveys();
        }
    }

    renderSurveys() {
        if (this.props.surveys.length === 0) {
            return <p className="SurveyList__empty">You haven't created any surveys yet. <a className="inline-link" href="/surveys/new">Create one now!</a></p>;
        }
        return this.props.surveys.reverse().map(survey => {
            return (
                <div key={survey._id} className="SurveyList__item">
                    <div className="SurveyList__item--titleBox">
                        <h3>{survey.surveyName}</h3>
                        <p className="subject">Subject: {survey.subject}</p>
                        <p className="date">Created on: {new Date(survey.dateSent).toLocaleDateString() + " " + new Date(survey.dateSent).toLocaleTimeString()}</p>
                        <p className="date">Sent on: {new Date(survey.dateSent).toLocaleDateString() + " " + new Date(survey.dateSent).toLocaleTimeString()}</p>
                    </div>
                    <div className="SurveyList__item--numbers">
                        <p className="label">Responses Recieved</p>
                        <p className="number number-1">{survey.yes + survey.no}</p>
                        <p className="label">Not responded</p>
                        <p className="number">{survey.totalRecipients - (survey.yes + survey.no)}</p>
                    </div>
                    <div className="SurveyList__item--graph">
                        <CircleGraph color="primary" value={survey.yes + survey.no} total={survey.totalRecipients} label="response rate" />
                    </div>
                    <div className="SurveyList__item--lastResponse">
                        <hr />
                        <p className="date">Last response recieved: {survey.lastResponded ? (new Date(survey.lastResponded).toLocaleDateString() + " at " + new Date(survey.lastResponded).toLocaleTimeString()) : 'NA'}</p>
                    </div>
                </div>
            );
        });
    }
    
    render() {
        return (
            <div className="SurveyList">
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({ surveys, auth }) {
    return { surveys, auth };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);