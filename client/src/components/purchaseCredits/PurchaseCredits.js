import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../../actions';

import Header from '../header/Header';
import PageHeader from '../pageHeader/PageHeader';

import '../../index.scss';
import './PurchaseCredits.scss';

import logo from '../../img/landing.jpg';

const PAYMENT_OPTIONS = [
    {credits: 1, cost: 199, name: 'Starter', offerDetails: '0% Savings'}, 
    {credits: 5, cost: 500, name: 'Basic', offerDetails: 'Save $4.95!'}, 
    {credits: 10, cost: 899, name: 'Standard', offerDetails: 'Save $10.91!'},
    {credits: 20, cost: 1599, name: 'Super Saver', offerDetails: 'Save $23.81!'}
];

class PurchaseCredits extends Component {
    
    renderPaymentOptions() {
        return _.map(PAYMENT_OPTIONS, option => {
            return (
                <div key={option.cost} className="PurchaseCredits__optionsContainer--item">
                    <StripeCheckout 
                        name="PinPoint"
                        image={logo}
                        description={`${option.credits} Credits for $${option.cost / 100}`}
                        panelLabel={`${option.credits} Credits for`}
                        amount={option.cost} //amount of money (in cents) requested from the user
                        token={token => this.props.handleToken(token, option.cost, option.credits)} //a call back function which is called after we have successfully recieved a authorization token from the stripe api
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        zipCode>
                        <div className="PurchaseCredits__optionsContainer--name">
                            <h3>{option.name}</h3>
                        </div>
                        <h3 className="PurchaseCredits__optionsContainer--price">${option.cost / 100}</h3>
                        <p className="PurchaseCredits__optionsContainer--credits">for <span>{option.credits}</span> credits</p>
                        <div className="PurchaseCredits__optionsContainer--offerDetails">
                            <h3>{option.offerDetails}</h3>
                        </div>
                        <button className="PurchaseCredits__optionsContainer--button btn">Buy Now</button>
                    </StripeCheckout>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                <Header linkText="Dashboard" linkHref="/dashboard" />
                <div className="PurchaseCredits">
                    <PageHeader text="Buy Credits" />
                    {this.props.isProcessing && <p>Payment processing...</p>}
                    {this.props.isError && <p>There was an error with your payment</p>}
                    {this.props.paymentSuccessful && <p>Payment successful!</p>}
                    <div className="PurchaseCredits__currentCredits">Available Credits: 7</div>
                    <div className="PurchaseCredits__infoBox">
                        <h3 className="PurchaseCredits__infoBox--title">How do credits work?</h3>
                        <p className="PurchaseCredits__infoBox--text">It costs 1 credit to send 1 survey. Each survey can be sent to up to 100,000 recipients. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur. Porro quisquam est qui dolorem ipsum quia dolor sit amet!</p>
                        <h4 className="PurchaseCredits__infoBox--text">Select a package to get started:</h4>
                    </div>
                    <div className="PurchaseCredits__optionsContainer">
                        {this.renderPaymentOptions()}
                    </div>
                    <p className="PurchaseCredits__poweredBy">Powered by Stripe</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ payment: { isProcessing, isError, paymentSuccessful } }) {
    return { isProcessing, isError, paymentSuccessful };
}

export default connect(mapStateToProps, actions)(PurchaseCredits);