# express_api_server
API server example in expressjs

We will implement a simple API server to create jobs and perform CRUD operation
on these jobs

The API specification can be found [here](./API_SPEC.md)


## Objective

Create an in memory store using the array and implement the following API endpoints
as express routes

* Create a new job - adds the job to the in memory store
* Update a job - We can only update a job which is in created status
* Delete a job - can delete only a job that has in created status
* Get a job by id - retrieves a job based on the id provided
* Get all jobs with a limit parameter provided


For all these exercises use appropriate HTTP response status codes

Folder Structure
/
  + index.js
  + package.json
  + jobs.json


### To create in-memory database
    var jobs = [];

    fs.readFile('jobs.json', {encoding:'utf8'}, function (err, data){
      if(err) throw err;
      JSON.parse(data).forEach(function (job) {
        jobs.push(job);
      });
    });

### Application skeleton for express rest API

    var express = require('express');
    var bodyParser = require('body-parser');

    var app = express();
    app.use(bodyParser.json());
    // extended: true allows rich query string to be parsed
    app.use(bodyParser.urlencoded({ extended: true }));



    app.post('/api/v1/jobs', function (req, res) {
      // request body is here
      var body = req.body;
    });

### Tips
  use lodash to perform CRUD operations on the array
