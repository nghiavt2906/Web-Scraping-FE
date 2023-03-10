# Web Scraping Fronted

## Pre-requisites

**In order to successfully run the application, you need:**

1. Node.js installed on your machine with at least version 16 (specifically 16.13.2)
2. React version 18 (18.2.0 specifically)

## Run the application locally

**Installation**

- First of all, install all the required packages:

```
npm install
```

**Environment variables**

- Next, add the `.env` file to root folder with the following keys:

```shell
VITE_SERVER_END_POINT=/*endpoint or hostname to the backend server*/
```

**Run the application**

- Run the application with the below command:

```
npm run dev
```

## Run the test locally

**Unit testing for page components**

- Run the below command for testing the page components:

```
npm run test
```

**Integration testing**

- Run the below command to open Cypress for integration testing:

```
npm run cypress:run
```

- Or open Cypress to run each integration test manually:

```
npm run cypress:open
```
