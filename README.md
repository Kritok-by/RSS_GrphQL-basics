# GraphQL Basics

> Imagine we have a couple of microservices that are created for the service Musicify, a new wikipedia for Music. We need to provide a comfortable and convenient service for our users to manage and retrieve data for different entities.
> You can find repository with microservices [here](https://github.com/rolling-scopes-school/node-graphql-service)
---

## Easy to use:
- Download project files (project located in *develop* branch)
- Go to project root directory
- Run `npm i`
- Download [microservices](https://github.com/rolling-scopes-school/node-graphql-service)
- There is instruction there, how install their
- Install and setup mongoDB

---

## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:4000` with nodemon

**Production**

`npm run start:prod`

* App served @ `http://localhost:4000` without nodemon

---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | App served @ `http://localhost:4000` with nodemon
`npm run start:prod` | App served @ `http://localhost:4000` without nodemon

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.

---

## Used technologies:
- TypeScript
- graphql
- apollo-server
- axios
- nodemon
- dotenv
- ts-node
- eslint
- node.js version: 16 LTS
