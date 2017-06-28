# Onsite Engagement Bot

Onsite chat bot that can seamlessly switch to an Engagement with an Operator
in case visitor needs more advanced human help.

# Demo

![SaleMove Onsite Bot demo](https://github.com/salemove/onsite-bot-app/raw/master/demo.gif)

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
