var frisby = require('frisby');

var URL = 'http://localhost:8888/';

// PUT YOUR HEADERS HERE
frisby.globalSetup({
  request: {
      Authorization: 'Bearer XSESU121JKHS',
    },
});

frisby.create('Create a job')
  .post(URL + 'api/v1/jobs', {
      name: 'jb_dbm',
    })
    .expectStatus(201)
    .expectJSONTypes('', { _id: String })
    .afterJSON(function (job) {
      console.log(job);
    })
.toss();
