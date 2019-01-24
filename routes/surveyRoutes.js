const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thank you for your feedback!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        //create survey
        const survey = new Survey({
            title,
            subject, 
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
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