const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    surveyName: String,
    subject: String,
    greeting: String,
    body: String,
    question: String,
    yesText: { type: String, default: 'Yes' }, 
    noText: { type: String, default: 'No' },
    goodbye: String,
    signature: String,
    fromEmail: String,
    recipients: [RecipientSchema], //sub-document collection - embed data into a property
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    totalRecipients: Number,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, //reference to another model instance
    dateCreated: Date,  
    dateSent: Date,
    lastResponded: Date,
    isDraft: { type: Boolean, default: true }
});

mongoose.model('surveys', surveySchema);