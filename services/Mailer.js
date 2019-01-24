const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        //super - call the parent class constructor (helper.Mail)
        super();
        this.sgApi = sendgrid(keys.sendGridKey);
        //assign properties to given instance of Mailer using 'this'
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        //register body to be used in email
        this.addContent(this.body); //addContent is a function from helper.Mail
        this.addClickTracking();
        this.addRecipients();
    }

    //extract email property from each recipient
    formatAddresses(recipients) {
                                //extra set of () required when destructuring in an arrow function
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

     //enable click tracking - doing so will instruct sendgrid to scan the email and replace each link with a unique identifier to be used later to identify 'who' clicked it
     addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
    
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
      }

      addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
      }

      async send() {
        const request = this.sgApi.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: this.toJSON()
        });
    
        const response = await this.sgApi.API(request);
        return response;
      }
}

module.exports = Mailer;