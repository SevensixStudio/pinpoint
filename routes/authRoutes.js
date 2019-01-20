const passport = require('passport');

module.exports = (app) => {
    //route handler                              //strategy name
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email'] //specifies to google what data we want from the user
        })
    );
    
    //google triggers this callback which in turn takes the code and sends it over to the google strategy to get the actual information for the user
    app.get('/auth/google/callback', passport.authenticate('google'));
};