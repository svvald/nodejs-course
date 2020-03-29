# EPAM Node.js Global Mentoring Program

## Prerequisites
Install all reqiured dependencies by executing the following command:

`npm install`

## Homework 1
### Task 1
Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.

__Launch and using notes__

Run the following command to start a program:

`npm run hw1-task1`

To finish executing use Ctrl+C (Control+C on Mac).

### Task 2
Write a program which should do the following:
- Read the content of csvfile from./csvdirectory. Example: https://epa.ms/nodejs19-hw1-ex1
- Use the csvtojsonpackage (https://github.com/Keyang/node-csvtojson) to convert csvfile to jsonobject.
- Write the csvfile content to a new txtfile. Use the following format: https://epa.ms/nodejs19-hw1-ex2.
- Do not load all the content of the csvfile into RAM via stream (read/write file content line by line).

__Launch and using notes__

The __csv__ file is stored inside `homework-1/csv` folder. You can replace by your own if you want to.

Run the following command to start a program:

`npm run hw1-task2`

The resulted __txt__ file will be placed in `homework-1` folder named as `data.txt`.

## Homework 2
Write a simple __REST__ service with __CRUD__ operations for User entity.
- To create __REST__ service, use __ExpressJS__ (https://expressjs.com/).
- The User should have the following properties:
  - `id: string`
  - `login: string`
  - `password: string`
  - `age: number`
  - `isDeleted: boolean`
- Service should have the following __CRUD__ operations for User:
  - get user by __id__;
  - create and update user;
  - get auto-suggest list from `limit` users, sorted by `login` property and filtered by `loginSubstringin` the login property:
  `getAutoSuggestUsers(loginSubstring, limit);`
  - remove user (__soft delete__ – user gets marked with `isDeleted` flag, but not removed from the collection).
- Store user’s collection in the service memory (while the service is running).

__Launch and using notes__

Run the following command to start a program:

`npm run hw2`

Use the following endpoints to interact with `REST`-service:
- __[GET]__    /users/:id - get user by id
- __[GET]__    /users?loginSubstring={""}&limit={10} - get auto-suggest list of users
- __[POST]__   /users - create a user
- __[PUT]__    /users/:id - update user
- __[DELETE]__ /users/:id - mark user as deleted

The body required for __create__ and __update__ requests:

`{ login: string, password: string, age: number }`

## Homework 3
Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL (https://www.heroku.com/postgresor https://www.elephantsql.com/plans.html).
- Write SQL script which will create Users table in the DB and fill it in with predefined users’ collection.
- Configure your REST service to work with PostgreSQL.
- Use the sequelize package(http://docs.sequelizejs.com/) as ORM to work with PostgreSQL.

The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-nodejs-project-structure/) and contain the following set of directories:
- routers / controllers
- services
- data-access
- models

## Homework 4
Add Group entity to already existing __REST__ service with __CRUD__ operations.
- TheGroup entity should have the following properties:
  - `id: string`
  - `name: string`
  - `permissions: Array<Permissions>`

`type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'`

- The service should provide the following __CRUD__ operations for Group:
  - get group by __id__;
  - get all groups;
  - create and update a group;
  - remove group (__hard delete__ – group data is fully removed from the DB).
- Storing of groups data should be done in __PostgreSQL__ in __Groups__ table.
- The service should follow the principles of 3-layer architecture.

Link __User__ records in one table with __Group__ records in another table.
- Add a __UserGroup__ table("many-to-many" relationship) which will store the data describingwhich users are assigned to which group.
- If any record gets removed from the DB, then all linked records should be removed from __UserGroup__ as well.

Add `addUsersToGroup(groupId, userIds)` method which will allow adding users to a certain group. Use __transactions__ to save records in DB.

__Launch and using notes__

Prior to launch the service itself one needs to have PostgreSQL instances installed and running locally or in cloud.
Then one should create a `.env` file in the root folder containing the following properties:
- APP_PORT (optional)
- DB_HOST
- DB_PORE
- DB_NAME
- DB_USER
- DB_PASSWORD

The next step is to fill the DB with the predefined data. This can be done by running the following command:

`npm run db:seed:`

If one needs to have DB cleared, this can be achieved by running the following command:

`npm run db:clear`

Finally, the service could be started by running the executing command:

`npm run hw3`

In addition to the endpoints listed above, use the following endpoints to interact with `REST`-service:
- __[GET]__    /groups - get all groups
- __[GET]__    /groups/:id - get group by id
- __[POST]__   /group - create a group
- __[PUT]__    /groups/:id - update group
- __[DELETE]__ /groups/:id - delete group
- __[POST]__   /groups/:id/addUsers - add users to group

The body required for __create__ and __update__ requests:

`{ name: string, permissions: Array<Permission> }`

The body required for __addUsers__ request:

`{ userIds: Array<string> }`

## Homework 5

Add express __middleware__ which will log which service method has been invoked and which arguments have been passed to it.

Add express __middleware__ which will log all unhandled errors and return a standard message with __HTTP__ code `500` (__Internal Server Error__).

Add error handling to `process.on(‘uncaughtException’,...)`.

Add __Unhandled promise rejection__ listener to log errors.

Every method in the controllers should log the errors which should include the following information:
- method name
- arguments which have been passed to the method
- error message

Add middleware wrapper functions (or decorators) which will track the methods’ execution time

## Homework 6

Add authorization to the already existing __REST__ service:
- Add `login(username, password)` method which should return __JWT__ token.
- Add a middleware which will proxy all the requests (except __login__) and check that __HTTP Authorization__ header has the correct value of __JWT__ token.
- In case of the __HTTP Authorization__ header is absent in the request, the middleware should stop further controller method execution and return __HTTP__ `401` code (__Unauthorized Error__) and standard error message.
- In case of __HTTP Authorization__ header has invalid JWTtoken in the request, the middleware should return __HTTP__ code `403` (__Forbidden Error__) and standard error message.

Add __CORS middleware__ to access service methods from WEB applications hosted on another domains (https://github.com/expressjs/cors).

__JWT secret__

An additional entry __JWT_SECRET__ should be added to the `.env` file prior to launching the service. Otherwise, a random number converted to string will be used as a JWT secret.