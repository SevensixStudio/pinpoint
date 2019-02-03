# [PinPoint](http://vast-earth-52435.herokuapp.com/)

#### By [Summer Brochtrup](https://www.linkedin.com/in/summerbrochtrup) (2019)

---

### Description

PinPoint is a web app that allows users to create surveys to collect feeback from customers on their services/products. Those surveys are then sent out to all of the listed recipients via SendGrid. User can see the results of their surveys displayed on their dashboard. 

Check out [PinPoint](http://vast-earth-52435.herokuapp.com/) on Heroku -- [CLICK HERE](http://vast-earth-52435.herokuapp.com/)

I built this app as part of my exploration into the world of React, Redux, Node.js, & MongoDB. PinPoint features the following: 
* User login with Google and Facebook Oauth handled by PassportJS
* Cookie based authentication
* Credit card payments handled through Stripe
* Wizard forms using Redux Form
* Email click & event handling using SendGrid’s Event Webhook
* An Express server handling interaction with MongoDB via Mongoose
* A user interface built with Sass & CSS Grid 
* Written primary with ES2017 syntax
* And all that [deployed to Heroku](http://vast-earth-52435.herokuapp.com/)!

---

### Technologies used

MongoDB
* Express 4.16.4
* Mongoose 5.4.5
* PassportJS 0.4.0
* Stripe 6.20.1
* SendGrid 5.2.3
* CookieSession 2.0.0-beta.3

* React 16.7.0
* Redux 4.0.1
* React Router 4.3.1
* Redux Form 8.1.0
* Redux Thunk 2.3.0
* Axios 0.18.0
* React Stripe Checkout 2.6.3
* Sass 4.11.0

---

### Setup

To view this project, clone this repository:
```
$ cd ~/Desktop
$ git clone https://github.com/Summer-Rose/pinpoint.git
$ cd pinpoint/
```
...run the project locally:
```
$ npm run dev
```
...open your web browser and navigate to http://localhost:3000/

---

### TODO

* Add redirects to components
* Wire up toolbar buttons in survey list item
* Create UI for status updatus and validation
* Ask for user verification on send and delete
* Fill dashboard stats with real data
* Allow users to upload emails from CSV file
* Backwards navigation
* Allow users to signup and login with Email/Password
* Make text darker in form 
* Make design responsive
* Design 'Thank you for responding page'
* Design email template
* Design landing page 
* Create additional email templates
  
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

### License

---

This software is licensed under the MIT license.

Copyright (c) 2019 Summer Brochtrup

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.