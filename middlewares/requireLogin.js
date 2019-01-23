//a middleware is a function that takes the incoming request and has the ability to modify it
module.exports = (req, res, next) => {
    //next is a function we call when our middleware is complete

    if (!req.user) {
        return res.status(401).send({ error: 'You must be logged in' });
    }
    next();
}