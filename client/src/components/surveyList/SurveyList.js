import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import TimeAgo from 'timeago-react';
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
                        <Link to={`/surveys/preview/${survey._id}`} className="removeLinkStyles">
                            <h3>{survey.surveyName}</h3>
                        </Link>
                        <p className="subject">Subject: {survey.subject}</p>
                        <p className="date">{survey.dateSent ? ('Sent on: ' + new Date(survey.dateSent).toLocaleDateString() + " " + new Date(survey.dateSent).toLocaleTimeString()) : "This survey has not been sent yet"}</p>
                        <p className="date">Created on: {new Date(survey.dateCreated).toLocaleDateString() + " " + new Date(survey.dateCreated).toLocaleTimeString()}</p>
                    </div>
                    <YesNoStats className="SurveyList__item--numbers" yesCount={survey.yes} noCount={survey.no} total={survey.totalRecipients} />
                    <div className="SurveyList__item--graph">
                        <CircleGraph color="primary" value={survey.yes + survey.no} total={survey.totalRecipients} label="response rate" />
                    </div>
                    <div className="SurveyList__item--lastResponse">
                        <hr />
                        {survey.lastResponded ? [<p className="date">Last response recieved: </p>,<TimeAgo className="date--ago" datetime={new Date(survey.lastResponded)} />] : <p className="date">No one has responded to your survey yet</p>}
                    </div>
                    <div key={survey._id} className="SurveyList__item--toolsPanel" id="tools">
                        <div className="SurveyList__item--toolsPanel--action">
                            <a href={`/surveys/preview/${survey._id}`}><i className="far fa-eye"></i></a>
                        </div>
                        {survey.isDraft && [
                            <div className="SurveyList__item--toolsPanel--action">
                                <a href="#"><i className="far fa-envelope"></i></a>
                            </div>,
                            <div className="SurveyList__item--toolsPanel--action">
                                <a href="#"><i className="far fa-edit"></i></a>
                            </div>]}
                        <div className="SurveyList__item--toolsPanel--action" onClick={() => this.props.deleteSurvey(survey._id)}>
                            <a href="#"><i className="far fa-trash-alt"></i></a>
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

function mapStateToProps({ surveys, auth, state }) {
    return { surveys, auth, state };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);