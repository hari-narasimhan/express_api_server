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
      //console.log(job);
    })
.toss();

frisby.create('List jobs')
  .get(URL + 'api/v1/jobs')
    .expectStatus(200)
    .expectJSONTypes('*', { _id: String })
    .afterJSON(function (jobs) {
      expect(jobs.length).toBeGreaterThan(50);
    })
.toss();


frisby.create('Fetch a job that does not exist')
  .get(URL + 'api/v1/jobs/1234')
    .expectStatus(404)
    .afterJSON(function (err) {
      //console.log(err);
    })
.toss();

frisby.create('Fetch a job that exists')
  .get(URL + 'api/v1/jobs/bd74d20d-8768-5313-a9bf-b3b11c3174ee')
    .expectStatus(200)
    .afterJSON(function (job) {
      expect(job._id).toEqual('bd74d20d-8768-5313-a9bf-b3b11c3174ee');
    })
.toss();

frisby.create('Try to update a job whose status is not "Created"')
  .put(URL + 'api/v1/jobs/5844ec0e-5b8f-59e8-9042-12bd39ad962e')
    .expectStatus(400)
    .afterJSON(function (response) {
      expect(response.errors.length).toBeGreaterThan(0);
      expect(response.errors[0].code).toEqual(1003);
    })
.toss();

frisby.create('Try to update a job whose status is "Created"')
  .put(URL + 'api/v1/jobs/bd74d20d-8768-5313-a9bf-b3b11c3174ee', {
      params: { clientId: 44315 },
    })
    .expectStatus(200)
    .afterJSON(function (updatedJob) {
      expect(updatedJob._id).toEqual('bd74d20d-8768-5313-a9bf-b3b11c3174ee');
      expect(updatedJob.params.clientId).toEqual('44315');
    })
.toss();

frisby.create('Try to update a job whose status is not "Created"')
  .put(URL + 'api/v1/jobs/5844ec0e-5b8f-59e8-9042-12bd39ad962e')
    .expectStatus(400)
    .afterJSON(function (response) {
      expect(response.errors.length).toBeGreaterThan(0);
      expect(response.errors[0].code).toEqual(1003);
    })
.toss();

frisby.create('Try to delete a job whose status is "Created"')
  .delete(URL + 'api/v1/jobs/bd74d20d-8768-5313-a9bf-b3b11c3174ee')
    .expectStatus(200)
    .afterJSON(function () {
      frisby.create('Fetch ')
        .get(URL + 'api/v1/jobs/bd74d20d-8768-5313-a9bf-b3b11c3174ee')
          .expectStatus(404)
      .toss();
    })
.toss();

frisby.create('Try to delete a job whose status is not "Created"')
  .delete(URL + 'api/v1/jobs/5844ec0e-5b8f-59e8-9042-12bd39ad962e')
    .expectStatus(400)
    .afterJSON(function (response) {
      expect(response.errors.length).toBeGreaterThan(0);
      expect(response.errors[0].code).toEqual(1003);
    })
.toss();
