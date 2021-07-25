# QuestionAndAnswer

[![Build Status](https://travis-ci.org/TMDav007/questionAndAnswer.svg?branch=develop)](https://travis-ci.org/TMDav007/questionAndAnswer)
[![Maintainability](https://api.codeclimate.com/v1/badges/e7852f238a2a43c44355/maintainability)](https://codeclimate.com/github/TMDav007/questionAndAnswer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e7852f238a2a43c44355/test_coverage)](https://codeclimate.com/github/TMDav007/questionAndAnswer/test_coverage)

This is an application that allows users interaction through questions and comments. This app will allow users ask a question or comment on a question by another user.
<img width="1439" alt="Screenshot 2021-07-25 at 02 34 27" src="https://user-images.githubusercontent.com/24706493/126885019-fc836a37-903a-499b-bd04-7794c599515a.png">


## Table of Content
* [Technologies](#technologies)
* [Features](#features)
* [API Endpoints](#api-endpoints)
* [Frontend](#frontend)
* Application Images (#images)
* [Getting Started](#getting-started)
   * [Installation](#installation)
   * [Documentations](#documentations)
   * [Testing](#testing) 
* [Contribution](#contribution)
* [Author](#author)

### Template
You can check the UI pages on [https://tmdav007.github.io/questionAndAnswer/UI/index.html](https://tmdav007.github.io/questionAndAnswer/UI/index.html)

### API Deployment
API is deployed at [https://questionsandanswer.herokuapp.com/api/v1/](https://questionsandanswer.herokuapp.com/api/v1/)

### Frontend
API is deployed at [https://questionsandanswer.herokuapp.com/](https://questionsandanswer.herokuapp.com/login)

### Applicacation Images
Application Images
-- Desktop View

Landing page
<img width="1439" alt="Screenshot 2021-07-25 at 02 34 27" src="https://user-images.githubusercontent.com/24706493/126885019-fc836a37-903a-499b-bd04-7794c599515a.png">

Register Page
<img width="647" alt="Screenshot 2021-07-25 at 02 35 12" src="https://user-images.githubusercontent.com/24706493/126885022-6e4ca82e-5ef0-4804-a0ba-985593f2badb.png">


Login Page

<img width="774" alt="Screenshot 2021-07-25 at 02 35 59" src="https://user-images.githubusercontent.com/24706493/126885024-a48c5ce7-cb83-4e0d-b1cf-f60afaae8d50.png">

User Dashboard

<img width="1440" alt="Screenshot 2021-07-25 at 02 40 01" src="https://user-images.githubusercontent.com/24706493/126885027-711ea483-e945-4d08-9cdb-bcc311be5342.png">

Ask a question Prompt
<img width="1148" alt="Screenshot 2021-07-25 at 02 45 06" src="https://user-images.githubusercontent.com/24706493/126885032-71bd422e-5723-4cde-833b-741460e4c774.png">

Mobile view
Landing page
<img width="380" alt="Screenshot 2021-07-25 at 02 48 38" src="https://user-images.githubusercontent.com/24706493/126885093-19466b15-ce40-4cf9-8490-407c15fb0de8.png">


Register Page
<img width="373" alt="Screenshot 2021-07-25 at 02 49 28" src="https://user-images.githubusercontent.com/24706493/126885096-c282ff27-4a75-4350-8cc6-3db3fc45f154.png">

Login Page
<img width="383" alt="Screenshot 2021-07-25 at 02 50 30" src="https://user-images.githubusercontent.com/24706493/126885097-c04cb831-c621-410b-a6a2-0a4858729b9a.png">

User Dashboard
<img width="346" alt="Screenshot 2021-07-25 at 02 42 29" src="https://user-images.githubusercontent.com/24706493/126885100-9a2896b5-4471-498d-86c5-f0810501d4dd.png">

Question prompt
<img width="558" alt="Screenshot 2021-07-25 at 02 41 25" src="https://user-images.githubusercontent.com/24706493/126885105-e86e8620-de60-4ccc-91fc-bae810aab6f3.png">

Delete Prompt
<img width="352" alt="Screenshot 2021-07-25 at 02 43 55" src="https://user-images.githubusercontent.com/24706493/126885106-3297344e-29b3-4411-95dd-afd5852a95f8.png">





## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework
* [ReactJs](https://reactjs.org/) - Frontend Application Framework
* [React-Redux](https://react-redux.js.org/) - Frontend Application Framework
* [Sass](https://sass-lang.com/) - Frontend Application Framework
* [Postgres]()- Database

### Supporting Packages

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator

## Features

### Question(user)
* Create a Question
* Modify a Question
* Get a Question
* Get All User Questions
* Delete a Question

### User
* Create a user
* Login a user

### Admin
* Get all users
* Delete a user

### Comment(User)
* Create a Comment
* Modify a Comment
* Get a Comment
* Delete a comment

## API Endpoints

* Get All Questions - /api/v1/questions 

* Get All User's Question - /api/v1/questions/user

* Post A Users Question - /api/v1/questions

* PUT A Users Question - /api/v1/questions/:questionId

* DELETE A User's Question - /api/v1/questions/:questionId

* POST Create a user - api/v1/auth/signup

* POST login a user - api/v1/auth/login

* GET all users(admin) - /api/v1/users/getAllUsers

* DELETE a user(admin) - /api/v1/users/deleteAUser/:userId

* Get All comments by a question - /api/v1/comments/:questionId

* Get a comment -/api/v1/comment/:commentId

* Post a comment - /api/v1/comments

* PUT A user's comment - /api/v1/comment/:commentId

* DELETE A User's comment - /api/v1/comment/:commentId


## Getting Started

### Installation

* git clone
  [questionAndAnswer](https://github.com/TMDav007/questionAndAnswer.git)
* Run `yarn install` or `npm install` to install packages
* Run `yarn build` or `npm run build` to build the project
* Run `yarn start` or `npm start` to start the server
* Navigate to [localhost:8000](http://localhost:8000/) in browser to access the
  application
  

### Testing

#### Using Postman

* Navigate to [localhost:8000](http://localhost:8000/) in
  [Postman](https://getpostman.com/) to access the application

#### Using Mocha and Coverage Data
* Run `yarn test` or `npm run test`
* It will run the test and display coverage data as generated by
  Istanbul's [nyc](https://github.com/istanbuljs/nyc)
  
## Contribution
* You can contribute to this project by the following process
- Fork the repo on Github
- Clone the project
- Create a branch
- Commit changes to the branch
- Push your work to your fork
- Make a pull request to review the changes

## Author
 - Afolabi, Opeyemi T., afolabi.toluwalase@yahoo.com.
