import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        if (this.props.auth) {
            this.props.fetchSurveys();
        }
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div key={survey._id}>
                    <div>
                        <span>{survey.title}</span>
                        <p>{survey.body}</p>
                        <p>
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }
    
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({ surveys, auth }) {
    return { surveys, auth };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);