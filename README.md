# Onsite Engagement Bot

Onsite chat bot that uses SaleMove JS API to seamlessly switch from a conversation with a bot to an Engagement with an
Operator in the case Visitor needs more advanced human help.

To get more information about SaleMove and our API visit:

* SaleMove web site - https://salemove.com
* JS API Documentation - https://js-sdk-docs.salemove.com
* REST API Documentation - http://developer.salemove.com


To get information on how to get access to the platform and require access keys, please, contact your account manager.

If you intend to only host this example on your local dev machine, the account manager will provide you a unique localhost domain name in format `<unique-subdomain>.localhost`.
This hostname will be used to access and run this example application.
See [Starting for local development](#starting-for-local-development) below for an example of using this hostname.

If you already have a hostname that resolves to your local development machine or target deployment machine, please provide it to your account manager.

# Demo

![SaleMove Onsite Bot demo](https://github.com/salemove/onsite-bot-app/raw/master/demo.gif)

# Versions

There are two versions of the bot:

1. Echo - just echoes all user messages. This is a default version available at `master` branch.
2. Dialogflow (formerly Api.ai) - uses Dialogflow [REST API](https://dialogflow.com/docs/reference/agent) for bot replies. Checkout `integrate-api-ai` branch for this version.
Register and get your access key at https://dialogflow.com to be able to have a more complex integration with this service.

# Starting for local development

#### 1. Setup domain name
In the case you are using domain name provided by your success manager add it to your `/etc/hosts` file as a loopback entry, for example:

```
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
127.0.0.1 <unique-subdomain>.localhost
```

If you are already using your own domain that already resolves to your local machine then no changes are needed.

#### 2. Start dev server

`> npm install`

install required packages for local development.

`> npm start`

compile the static assets and serve the example site on `http://localhost:8080` using webpack dev server.

For serving the example site on a different port specify `PORT` environment variable before starting the process, for example:

`> PORT=8888 npm start`

#### 3. Open the app
Open application in browser at `<unique-subdomain>.localhost` on a specified port, for example `http://<unique-subdomain>.localhost:8080`

# Tests

`> npm test`

run the unit tests.

# Build bundle

`> npm run build`

build the application into one bundle `dist/app.js`.
