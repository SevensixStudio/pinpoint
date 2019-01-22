const passport = require('passport');

module.exports = (app) => {
    //route handler                              //strategy name
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email'] //specifies to google what data we want from the user
        })
    );

    app.get('/auth/facebook', passport.authenticate('facebook'));
    
    //google triggers this callback which in turn takes the code and sends it over to the google strategy to get the actual information for the user
    app.get(
        '/auth/google/callback',
         passport.authenticate('google'),
         (req, res) => {
            res.redirect('/surveys');
         } //where the request is sent after the passport.authenticate middleware is executred
    );

    app.get(
        '/auth/facebook/callback', 
        passport.authenticate('facebook'),
        (req, res) => {
            res.redirect('/surveys');
         }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    //req is incoming request
    //res is the outgoing response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};