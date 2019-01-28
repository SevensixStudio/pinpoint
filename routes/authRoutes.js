const passport = require('passport');

module.exports = (app) => {
    //route handler                              //strategy name
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email'], //specifies to google what data we want from the user
            prompt : "select_account"
        })
    );

    app.get('/auth/facebook', passport.authenticate('facebook', {
            authType: 'reauthenticate'
        })
    );
    
    //google triggers this callback which in turn takes the code and sends it over to the google strategy to get the actual information for the user
    app.get(
        '/auth/google/callback',
         passport.authenticate('google'),
         (req, res) => {
            res.redirect('/dashboard');
         } //where the request is sent after the passport.authenticate middleware is executred
    );

    app.get(
        '/auth/facebook/callback', 
        passport.authenticate('facebook'),
        (req, res) => {
            res.redirect('/dashboard');
         }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/logoutsignup', (req, res) => {
        req.logout();
        res.redirect('/signup');
    });
    
    //req is incoming request
    //res is the outgoing response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};