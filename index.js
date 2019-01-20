//import Express library
const express = require('express'); //common JS modules 
//ES2015 modules imported this way:
// import express from 'express';
//but Node does not yet support this

//generate new express application - can have mutliple express apps in one project
const app = express();

//app -- running express server which has some number of route handlers associated with it
//.get() -- creates brand new route handler that watches for requests with the 'get' method
//Express methods: get (info), post (send), put (update), delete, patch (update 1 or 2 props)
// '/' --  route handler
// 'req' -- request - contains data about who is making the request
// 'res -- response - represents outgoing response
app.get('/',  (req, res) => {
    res.send({ hello: 'world' });
});

//dynamic port binding
//Heroku injects environment variables at runtime
//Heroku passes us runtime configuration that it can only tell us after we have deployed the application
//process.env.PORT grabs the port from the underlying environment
//in a development environment process.env.PORT might not be defined yet so 5000 is the default port for development
const PORT = process.env.PORT || 5000;

//tells epxress to tell Node that it want's to listen to requests on port defined above
app.listen(PORT);