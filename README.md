# Description

Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements.

The database schema and and API route information can be found in the (REQUIREMENT.md)

## Installation Instructions:

`npm install`

### Packages

#### db-migrate

`npm install -g db-migrate`

#### express

`npm i -S express`
`npm i -D @types/express`

#### typescript

`npm i -D typescript`

#### jasmine

`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

#### bcrypt

`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### jsonwebtoken

`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### supertest

`npm i supertest`
`npm i --save-dev @types/supertest`

### nodemon

`npm i nodemon`

#### morgan

`npm install --save morgan`
`npm -i -D @types/morgan`

## Set up Database

`docker-compose up` to start the docker container
`npm install` to install all dependencies
`db-migrate up` to set up the database and get access via http://127.0.0.1:5432

### Start

`npm run start` to start the app and get access via http://127.0.0.1:

## Environmental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

**NB:**

```
PORT=127.0.0.1
POSTGRES_HOST="localhost"
POSTGRES_USER="store"
POSTGRES_PASSWORD="store"
POSTGRES_DB="store-DB"
POSTGRES_TEST_DB="store-DB"
TOKEN_KEY="store"
BCRYPT_PASSWORD="store"
SALT_ROUNDS="5"
ENV="test"

```

## Start App

`npm run start`

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Testing

Run test with

`npm run test`
