import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey, sendSurvey, resetDeleteState } from '../../actions';
import TimeAgo from 'timeago-react';
import CircleGraph from '../circleGraph/CircleGraph';

import '../../index.scss';
import './SurveyList.scss';
import YesNoStats from '../numberStats/YesNoStats';

class SurveyList extends Component {
    componentDidMount() {
        if (this.props.user) {
            this.props.fetchSurveys();
        }
    }

    componentWillUnmount() {
        console.log('component will unmounty');
        if (this.props.deleteSuccessful) {
            this.props.resetDeleteState();
            console.log(this.props);
        }
    }

    renderSurveys() {
        const surveys = this.props.surveys;
        if (surveys.length === 0) {
            return <p className="SurveyList__empty">You haven't created any surveys yet. <a className="inline-link" href="/surveys/new">Create one now!</a></p>
        }
        if (this.props.isLoading) {
            return <p>LOADING...</p>;
        }
        return surveys.map(survey => {
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
                        <Link to={`/surveys/preview/${survey._id}`}>
                            <div className="SurveyList__item--toolsPanel--action">
                                <p href={`/surveys/preview/${survey._id}`}><i className="far fa-eye"></i></p>
                            </div>
                        </Link>
                        {survey.isDraft && [
                            <Link key="edit" to={`/surveys/edit/${survey._id}`}>
                                <div className="SurveyList__item--toolsPanel--action">
                                    <p><i className="far fa-edit"></i></p>
                                </div>
                            </Link>,
                            <div key="send" className="SurveyList__item--toolsPanel--action" onClick={() => this.props.sendSurvey(survey._id)}>
                                <p><i className="far fa-envelope"></i></p>
                            </div>
                        ]}
                        <div className="SurveyList__item--toolsPanel--action" onClick={() => this.props.deleteSurvey(survey._id, false)}>
                            <p><i className="far fa-trash-alt"></i></p>
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

function mapStateToProps({ surveyList: {surveys, isLoading }, auth: { user }, deleteStatus, sendStatus, state }) {
    return { 
        surveys, 
        isLoading,
        user, 
        isDeleting: deleteStatus.isDeleting,
        isDeleteError: deleteStatus.isDeleteError,
        deleteErrorMessage: deleteStatus.errorMessage,
        deleteSuccessful: deleteStatus.deleteSuccessful,
        isSending: sendStatus.isSending,
        sendSuccessful: sendStatus.sendSuccessful,
        isSendError: sendStatus.isError,
        sendErrorMessage: sendStatus.errorMessage,
        state };
}

export default withRouter(connect(mapStateToProps, { fetchSurveys, deleteSurvey, sendSurvey, resetDeleteState })(SurveyList));