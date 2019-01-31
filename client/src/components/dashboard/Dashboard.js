import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SurveyList from '../surveyList/SurveyList';
import Header from '../header/Header';

import '../../index.scss';
import './Dashboard.scss';

class Dashboard extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            default: 
                return [
                    <div key="stats" className="Dashboard__stats">
                        <div className="Dashboard__stats--box">
                            <p className="Dashboard__stats--box--label">Available credits</p>
                            <p className="Dashboard__stats--box--number">{this.props.auth.credits}</p>
                            <Link className="btn btn--yellow" to="/purchase">Buy credits</Link>
                        </div>
                        <div className="Dashboard__stats--box">
                            <p className="Dashboard__stats--box--label">Surveys sent</p>
                            <p className="Dashboard__stats--box--number">7</p>
                        </div>
                        <div className="Dashboard__stats--box">
                            <p className="Dashboard__stats--box--label">Total responses</p>
                            <p className="Dashboard__stats--box--number">305</p>
                        </div>
                        <div className="Dashboard__stats--box">
                            <p className="Dashboard__stats--box--label">Average completion rate</p>
                            <p className="Dashboard__stats--box--number">60%</p>
                        </div>
                    </div>,
                    <div key="toolbar" className="Dashboard__survey-toolbar">
                        <p className="heading-secondary">Your surveys</p>
                        <Link to="/surveys/new" className="btn btn--primaryDark">Create Survey</Link>
                        <hr />
                    </div>,
                    <div key="surveys" className="Dashboard__surveyList">
                        <SurveyList />
                    </div>
                ];
        }
    }

    render() {
        console.log(this.props.auth);
        return (
            <div className="dashboard-container Dashboard">
                <Header linkText="Create Survey" linkHref="/surveys/new" />
                {this.renderContent()}
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Dashboard);