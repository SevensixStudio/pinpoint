export default {
    1: {
        title: "Let's get started!",
        message: "First things first, please name the survey you'll be creating. Don't worry about being too creative -- the survey name is just for your reference and will not be seen by anyone but you.",
        fields: [
            {label: 'Survey Name', name: 'surveyName', errorMessage: 'Please give your survey a name', type: 'text'}
        ]
    },
    2: {
        title: "Email subject, greeting, and message",
        message: "Let's get started with the email that you'll be sending out to your customers. Give your email a catchy subject line to entice your recipients to open it! Be sure to give them a pleasant greeting that suites your company's style and then provide some information about the survey in the email body.",
        fields: [
            { label: 'Subject Line', name: 'subject', errorMessage: 'You must provide a subject line', type: 'text' },
            { label: 'Greeting', name: 'greeting', errorMessage: 'Please add a greeting', type: 'text' },
            { label: 'Email Body', name: 'body', errorMessage: 'Please add some content to your email', type: 'textarea' }
        ]
    },
    3: {
        title: "Survey Question",
        message: "Now for the most important part -- What question do you want to ask your customers? Remember it has to be a yes or no question. You can also customize the 'yes' and 'no' responses if you like.",
        fields: [
            { label: 'Question', name: 'question', errorMessage: 'Please fill out the question field', type: 'textarea' },
            { label: 'Yes', name: 'yes', type: 'text' },
            { label: 'No', name: 'no', type: 'text' }
        ]
    },
    4: {
        title: "Email goodbye and signature",
        message: "Let's wrap up the email component of your survey. Please write a goodbye message that will be shown at the bottom of the email to thank the customer for their time. Please also make sure to say who this email is from in the 'Signature' box!",
        fields: [
            { label: 'Goodbye message', name: 'goodbye', errorMessage: 'Please add a goodbye message', type: 'text' },
            { label: 'Signature', name: 'signature', errorMessage: 'Please tell your recipients who this email is from', type: 'text' }
        ]
    },
    5: {
        title: "Recipients",
        message: "Now that we are done with the email component of your survey let's add some recipients! Please enter the email address separated by a comma or upload a CSV file. And don't forget to provide a 'reply-to' e-mail address.",
        fields: [
            { label: 'Recipients List', name: 'recipients', errorMessage: 'You must enter at least one email address', type: 'textarea'},
            { label: 'Reply-to email', name: 'fromEmail', errorMessage: 'What e-mail address do you want to show in the from line?', type: 'email' },
        ]
    },
    6: {
        title: "Review and edit",
        message: "The hard part is over! Give yourself a pat on the back. When you're done, read through each of the fields and make any necessary edits before hitting 'Send'. Remember once you hit send you cannot make anymore edits.",
        fields: [
            { label: 'Survey Name', name: 'surveyName', errorMessage: 'Please give your survey a name', type: 'text' },
            { label: 'Subject Line', name: 'subject', errorMessage: 'You must provide a subject line', type: 'text' },
            { label: 'Greeting', name: 'greeting', errorMessage: 'Please add a greeting', type: 'text' },
            { label: 'Email Body', name: 'body', errorMessage: 'Please add some content to your email', type: 'textarea' },
            { label: 'Question', name: 'question', errorMessage: 'Please fill out the question field', type: 'textarea' },
            { label: 'Yes', name: 'yes', type: 'text' },
            { label: 'No', name: 'no', type: 'text' },
            { label: 'Goodbye message', name: 'goodbye', errorMessage: 'Please add a goodbye message', type: 'text' },
            { label: 'Signature', name: 'signature', errorMessage: 'Please tell your recipients who this email is from', type: 'text' },
            { label: 'Recipients List', name: 'recipients', errorMessage: 'You must enter at least one email address', type: 'textarea'},
            { label: 'Reply-to email', name: 'fromEmail', errorMessage: 'What e-mail address do you want to show in the from line?', type: 'email' }
        ]
    }
};