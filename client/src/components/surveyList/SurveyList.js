import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import CircleGraph from '../circleGraph/CircleGraph';

import '../../index.scss';
import './SurveyList.scss';
import YesNoStats from '../numberStats/YesNoStats';

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
        return this.props.surveys.map(survey => {
            return (
                <div key={survey._id} className="SurveyList__item">
                    <div className="SurveyList__item--titleBox">
                        <h3>{survey.surveyName}</h3>
                        <p className="subject">Subject: {survey.subject}</p>
                        <p className="date">Created on: {new Date(survey.dateCreated).toLocaleDateString() + " " + new Date(survey.dateCreated).toLocaleTimeString()}</p>
                        <p className="date">Sent on: {survey.dateSent ? (new Date(survey.dateSent).toLocaleDateString() + " " + new Date(survey.dateSent).toLocaleTimeString()) : "This survey has not been sent yet"}</p>
                    </div>
                    <YesNoStats className="SurveyList__item--numbers" yesCount={survey.yes} noCount={survey.no} total={survey.totalRecipients} />
                    <div className="SurveyList__item--graph">
                        <CircleGraph color="primary" value={survey.yes + survey.no} total={survey.totalRecipients} label="response rate" />
                    </div>
                    <div className="SurveyList__item--lastResponse">
                        <hr />
                        <p className="date">Last response recieved: {survey.lastResponded ? (new Date(survey.lastResponded).toLocaleDateString() + " at " + new Date(survey.lastResponded).toLocaleTimeString()) : 'No one has responded to your survey yet'}</p>
                    </div>
                    <div key={survey._id} className="SurveyList__item--toolsPanel" id="tools">
                        <div className="SurveyList__item--toolsPanel--action">
                            <a href={`/surveys/preview/${survey._id}`}><i class="far fa-eye"></i></a>
                        </div>
                        <div className="SurveyList__item--toolsPanel--action">
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                        <div className="SurveyList__item--toolsPanel--action">
                            <a href="#"><i class="far fa-edit"></i></a>
                        </div>
                        <div className="SurveyList__item--toolsPanel--action" onClick={() => this.props.deleteSurvey(survey._id)}>
                            <a href="#"><i class="far fa-trash-alt"></i></a>
                        </div>
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

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);