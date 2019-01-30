const keys = require('../../config/keys');

//Generate all of the HTML that will be sent out in the email 
module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h4>${survey.greeting}</h4>
          <p>${survey.body}</p>
          <p>${survey.question}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">${survey.yesText}</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">${survey.noText}</a>
          </div>
          <p>${survey.goodbye}</p>
          <p>${survey.signature}</p>
        </div>
      </body>
    </html>
  `;
};