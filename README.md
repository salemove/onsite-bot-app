# Onsite Engagement Bot

Onsite chat bot that uses SaleMove JS API to seamlessly switch from a conversation with a bot to an Engagement with an
Operator in the case Visitor needs more advanced human help.

To get more information about SaleMove and our API visit:

* SaleMove web site - https://salemove.com
* JS API Documentation - https://js-sdk-docs.salemove.com
* REST API Documentation - http://developer.salemove.com


To get information on how to get access to the platform and require access keys, please, contact your account manager.

If you intend to only host this example on your local dev machine, the account manager will provide you a unique localhost name with format `<unique-id>.local.dev`.
This hostname will be used to access and run this example application.
See [Starting for local development](starting-for-local-development) below for an example of using this hostname with nginx.

If you already have a hostname that resolves to your local development machine or target deployment machine, please provide that to the account manager.

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

To work with SaleMove platform you will need a local domain name resolving to this address. One way to do this is
by setting up a reverse proxy using [nginx](http://nginx.org/en/docs/install.html) with the following config:

```nginx
server {
  listen 443 ssl;
  server_name onsite-bot.local.dev;
  location / {
    proxy_pass http://localhost:3009;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
  }
}
```

# Tests

`> npm test`

runs the unit tests.

# Build bundle

`> npm run build`

builds the application into one bundle `dist/app.js`.
