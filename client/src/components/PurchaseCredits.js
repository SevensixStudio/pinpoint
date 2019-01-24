import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';

const PAYMENT_OPTIONS = [
    {credits: 1, cost: 199}, 
    {credits: 5, cost: 500}, 
    {credits: 10, cost: 899},
    {credits: 20, cost: 1599}
];

class PurchaseCredits extends Component {
    
    renderPaymentOptions() {
        return _.map(PAYMENT_OPTIONS, option => {
            return (
                <li key={option.cost}>
                    <div>
                        <StripeCheckout 
                            name="PinPoint"//header in payment window
                            description={`${option.credits} Credits for $${option.cost / 100}`}
                            amount={option.cost} //amount of money (in cents) requested from the user
                            token={token => this.props.handleToken(token, option.cost, option.credits)} //a call back function which is called after we have successfully recieved a authorization token from the stripe api
                            stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                            <button>
                                <h2>{option.credits} Credits for ${option.cost / 100}</h2>
                            </button>
                        </StripeCheckout>
                    </div>
                </li>
            )
        });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.renderPaymentOptions()}
                </ul>
            </div>
        );
    }
}

export default connect(null, actions)(PurchaseCredits);