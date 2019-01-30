const _ = require('lodash');
const Path = require('path-parser').default;
    //url is in integrated model in the node.js system
const { URL } = require('url'); 
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        //we don't want to pull out all of the recipients because we won't be showing any of these email address
        //solution? whitelist the reciepient field using Query#select 
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false }); //exclude recipients property
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thank you for your feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        //extract the path from the incoming url, the survey id, and the choice
         _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            //iterates through the array and removes any elements that are undefined
            .compact()
            //remove any duplicates
            .uniqBy('email', 'surveyId')
            //iterate over events and issue query for each one
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    //find the correct survey
                    _id: surveyId,
                    recipients: {
                        //find the correct recipient
                        $elemMatch: {
                            email: email,
                            responded: false
                        }
                    }
                }, {
                    //update properties with fields in this object without ever pulling it over to our express server
                    $inc: { [choice] : 1 }, //Mongo operator -- put logic inside query. Find the choice property and increment (inc) by 1
                    //using [] around choice (key interpolation) it will pull in the value of the choice variable
                    $set: { 'recipients.$.responded': true }, //$ here refers to recipient returned from elemMatch from the original query above
                    lastResponded: new Date()
                }).exec(); 
            })
            .value();

        res.send({}); //notify sendgrid that we are good
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, greeting, body, question, yesText, noText, goodbye, signature, fromEmail, recipients } = req.body;
        //create survey
        const survey = new Survey({
            title,
            subject, 
            greeting,
            body,
            question,
            yesText, 
            noText,
            goodbye,
            signature,
            fromEmail,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            totalRecipients: recipients.length,
            _user: req.user.id,
            dateSent: Date.now()
        }); 

        //attempt to create and send email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            //did email send successfully?
            //save survey
            await survey.save();
            //deduct one credit from user
            req.user.credits -= 1;
            //save user
            const user = await req.user.save();
            //send updated user to get header to update as well
            res.send(user);
        } catch (err) {
            //422 -- unprocessable entity
            res.status(422).send(err);
        }
        //survey handler complete
    });
};


