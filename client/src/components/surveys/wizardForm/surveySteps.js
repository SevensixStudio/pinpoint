export default {
    1: {
        message: "Step One",
        fields: [
            {label: 'Survey Name', name: 'surveyName', errorMessage: 'Please give your survey a name', type: 'text'}
        ]
    },
    2: {
        message: "Step Two",
        fields: [
            { label: 'Subject Line', name: 'subject', errorMessage: 'You must provide a subject line', type: 'text' },
            { label: 'Greeting', name: 'greeting', errorMessage: 'Please add an e-mail greeting', type: 'text' },
            { label: 'Email Body', name: 'body', errorMessage: 'Please add some content to your email', type: 'text' }
        ]
    },
    3: {
        message: "Step Three",
        fields: [
            { label: 'Question', name: 'question', errorMessage: 'Please fill out the question field', type: 'text' },
            { label: 'Yes', name: 'yes', type: 'text' },
            { label: 'No', name: 'no', type: 'text' }
        ]
    },
    4: {
        message: "Step Four",
        fields: [
            { label: 'Goodbye message', name: 'goodbye', errorMessage: 'Please add a goodby message', type: 'text' },
            { label: 'Signature', name: 'signature', errorMessage: 'Please tells your recipients who this email is from', type: 'text' }
        ]
    },
    5: {
        message: "Step Five",
        fields: [
            { label: 'From email', name: 'fromEmail', errorMessage: 'What e-mail address do you want to show in the from line?', type: 'text' },
            { label: 'Recipients List', name: 'recipients', errorMessage: 'Please enter a valid email address', type: 'text'}
        ]
    },
    6: {
        message: "Preview",
        fields: [
            { label: 'Survey Name', name: 'surveyName', errorMessage: 'Please give your survey a name', type: 'text' },
            { label: 'Subject Line', name: 'subject', errorMessage: 'You must provide a subject line', type: 'text' },
            { label: 'Greeting', name: 'greeting', errorMessage: 'Please add an e-mail greeting', type: 'text' },
            { label: 'Email Body', name: 'body', errorMessage: 'Please add some content to your email', type: 'text' },
            { label: 'Question', name: 'question', errorMessage: 'Please fill out the question field', type: 'text' },
            { label: 'Yes', name: 'yes', type: 'text' },
            { label: 'No', name: 'no', type: 'text' },
            { label: 'Goodbye message', name: 'goodbye', errorMessage: 'Please add a goodby message', type: 'text' },
            { label: 'Signature', name: 'signature', errorMessage: 'Please tells your recipients who this email is from', type: 'text' },
            { label: 'From email', name: 'fromEmail', errorMessage: 'What e-mail address do you want to show in the from line?', type: 'text' },
            { label: 'Recipients List', name: 'recipients', errorMessage: 'Please enter a valid email address', type: 'text'}
        ]
    }
};