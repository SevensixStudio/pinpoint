import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        //pass in child Component to use as the button rather than default
        return (
            <StripeCheckout 
                name="PinPoint"//header in payment window
                description="$5 for 5 survey credits"
                amount={500} //amount of money (in cents) requested from the user
                token={token => this.props.handleToken(token)} //a call back function which is called after we have successfully recieved a authorization token from the stripe api
                stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}



export default connect(null, actions)(Payments);