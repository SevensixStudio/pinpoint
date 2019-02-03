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
            .sort({dateSent: -1})
            .select({ recipients: false }); //exclude recipients property
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId', requireLogin, async (req, res) => {
        const survey = await Survey.findOne({ _id: req.params.surveyId });
        res.send(survey);
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
    
    app.post('/api/surveys/send/:surveyId', requireLogin, requireCredits, async (req, res) => {
        const survey = await Survey.findOneAndUpdate({ _id: req.params.surveyId }, { $set:{ isDraft: false, dateSent: Date.now() }}, {new: true}, (error, doc) => {
            if (error) {
                res.send(error);
            }
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
            res.send({ user, survey });
        } catch (err) {
            //422 -- unprocessable entity
            res.status(422).send(err);
        }
        //survey handler complete
    });

    app.post('/api/surveys/save', requireLogin, async (req, res) => {
        const { surveyName, subject, greeting, body, question, yesText, noText, goodbye, signature, fromEmail, recipients } = req.body;

        const uniqueRecipients = emailsStringToUniqueRecipients(recipients);

        const survey = new Survey({
            surveyName,
            subject, 
            greeting,
            body,
            question,
            yesText, 
            noText,
            goodbye,
            signature,
            fromEmail,
            recipients: uniqueRecipients,
            totalRecipients: uniqueRecipients.length,
            _user: req.user.id,
            dateCreated: Date.now()
        }); 
        try {
            await survey.save();
            res.send(survey);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.post('/api/surveys/update/:surveyId', requireLogin, async (req, res) => {
        const { surveyName, subject, greeting, body, question, yesText, noText, goodbye, signature, fromEmail, recipients } = req.body;
       
        const uniqueRecipients = emailsStringToUniqueRecipients(recipients);
       
        const survey = await Survey.findOneAndUpdate({ _id: req.params.surveyId }, 
            { 
                $set:{ 
                    surveyName,
                    subject,
                    greeting,
                    body,
                    question,
                    yesText, 
                    noText,
                    goodbye,
                    signature,
                    fromEmail,
                    recipients: uniqueRecipients,
                    totalRecipients: uniqueRecipients.length,
                    dateUpdated: Date.now() 
                }
            }, {new: true}, (error, doc) => {   
                if (error) {
                    res.send(error);
                }
            });
            try {
                await survey.save();
                res.send(survey);
            } catch (err) {
                res.status(422).send(err);
            }
    });
    
    
    app.delete('/api/surveys/:surveyId', requireLogin, async (req, res) => {
        try {
            await Survey.deleteOne({ _id: req.params.surveyId });
            const surveys = await Survey.find({ _user: req.user.id })
                .sort({dateSent: -1})
                .select({recipients: false});
        
            res.send(surveys);
        } catch (err) {
            res.status(404).send({ error: `Unable to delete survey with the ID of '${req.params.surveyId}'` });
        }
    });
};

//Helper functions
function emailsStringToUniqueRecipients(emailsString) {
    const emails = (emailsString.split(',')).map(email => {
        return email.trim();
    });
    return (removeDuplicates(emails)).map(email => ({ email: email.trim() }));
}

function removeDuplicates(items) {
    let unique = {};
    items.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }