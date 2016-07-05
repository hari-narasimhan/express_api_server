# express_api_server
API server example in expressjs

We will implement a simple API server to create jobs and perform CRUD operation
on these jobs

The API specification can be found [here](./API_SPEC.md)


API Server

- CRUD for Jobs

	/api/v1/jobs

MODEL
	_id  - automatically created
	name - Name of job - mandatory
	params - job parameters - optional
	when - unix timestamp optional
	status - server assigned - [CREATED, RUNNING, COMPLETED]
	createdAt - Server assigned - unix timestamp
	updatedAt - Server assigned - unix timestamp

create a new jon

	POST /api/v1/jobs
	{
	 "name" : "pull_gcm_data",
	 "params": { "clientId" : "1011324567" },
         "
