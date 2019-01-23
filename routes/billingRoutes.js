const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        //handle token and finalize charge with stripe
        //post does not automatically parse the request body so we use a middleware body-parser
    
        const amount = req.body.amount;

        //create charge and bill credit card
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            description: amount + ' for ' + (amount/100) + ' credits',
            source: req.body.token.id //id of current charge authorization
        });
        
        //update user's credits
        req.user.credits += 5;
        const user = await req.user.save();

        //send back data to browser
        res.send(user);
    });
};