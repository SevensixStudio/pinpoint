// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function validateEmails(emails) {
    const invalidEmails = [];
    const validEmails = [];
    emails
        .split(',')
        .map(email => email.trim())
        .map(email => {
        if (email.length && re.test(email) === false) {
            return invalidEmails.push(email);
        } else if (email.length && re.test(email) === true) {
            return validEmails.push(email);
        }
        return null;
    });

    if (!validEmails.length) {
        return "Please enter at least ONE valid e-mail address";
    }
    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }
    return;
};

export function validateEmail(email) {
    email = email.trim();
    if (email.length && re.test(email) === false) {
        return "Please enter a valid email address"
    }
    return;
};