# Onsite Engagement Bot

Onsite chat bot that uses SaleMove JS API to seamlessly switch from a conversation with a bot to an Engagement with an
Operator in the case Visitor needs more advanced human help.

To get more information about SaleMove and our API visit:

* SaleMove web site - https://salemove.com
* JS API Documentation - https://js-sdk-docs.salemove.com
* REST API Documentation - http://developer.salemove.com


To get information on how to get access to the platform and require access keys, please, contact your account manager.

# Demo

<img src="https://github.com/salemove/onsite-bot-app/raw/master/demo.gif" alt="SaleMove Onsite Bot demo" width="350">

# Versions

There are two versions of the bot:

1. Echo - just echoes all user messages. This is a default version available at `master` branch.
2. Api.ai - uses api.ai [REST API](https://docs.api.ai/docs/reference) for bot replies. Checkout `integrate-api-ai` branch for this version.
Register and get your access key at https://api.ai to be able to have a more complex integration with this service.

## Starting for local development

`> npm install`

installs required packages for local development.

`> npm start`

compiles the static assets and serve them and the example site on `http://localhost:3009`.

# Tests

`> npm test`

runs the unit tests.

# Build bundle

`> npm run build`

builds the application into one bundle `dist/app.js`.
