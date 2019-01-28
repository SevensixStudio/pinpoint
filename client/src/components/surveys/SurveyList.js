import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

import '../../index.scss';
import './SurveyList.scss';

class SurveyList extends Component {
    componentDidMount() {
        console.log(this.props.auth);
        if (this.props.auth) {
        
            this.props.fetchSurveys();
        }
    }

    renderSurveys() {
        console.log(this.props.surveys);
        if (this.props.surveys.length === 0) {
            return <p>NO SURVEYS</p>;
        }
        return this.props.surveys.reverse().map(survey => {
            return (
                <div key={survey._id} className="SurveyList__item">
                    <div>
                        <span>{survey.title}</span>
                        <p>Edit: show on hover</p>
                        <p>Send: show on hover</p>
                        <p>Delete: show on hover</p>
                        <p>{survey.body}</p>
                        <p>Created on: 1/1/1111</p>
                        <p>
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                        <p>Pretty circle diagram</p>
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