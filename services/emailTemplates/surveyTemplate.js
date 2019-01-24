const keys = require('../../config/keys');

//Generate all of the HTML that will be sent out in the email 
module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>We'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};