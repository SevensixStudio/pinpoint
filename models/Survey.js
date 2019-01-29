const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //sub-document collection - embed data into a property
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    totalRecipients: Number,
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, //reference to another model instance  
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);