# Predix Arcade

A React-based web UI for [JSNES](https://github.com/bfirsh/jsnes) ready for Predix deployment. Based on [JSNES Web UI](https://github.com/bfirsh/jsnes-web).

## Development Setup

Clone or download and extract the source code:

```Shell
git clone https://github.com/futuregarnet/predix-jsnes.git
cd predix-jsnes
```

### Install Tools

If you don't have them already, you'll need yarn (with Node.js) installed:

1. Install [yarn](https://yarnpkg.com/en/docs/install).

### Install the Dependencies

This app uses packages managed by yarn. Issue the following command to install them:

```Shell
yarn
```

### Local Configuration Files

You will need to create a Predix Timeseries instance and update the config.py file with its details.

To learn how to create a Predix Timeseries instance, follow [this guide](https://www.predix.io/resources/tutorials/tutorial-details.html?tutorial_id=1549).

Edit the src/config.js file and add the following details:

- **ASSET_NAME**: The name for your Predix Arcade (used for Timeseries Tags)
- **TIMESERIES_API_URL**: Your Time Series API (Data Client) URL

## Local Development

To start the app locally, issue the command:

```Shell
yarn start
```

This command will compile code for local development and watch changes for file. Your browser should automatically open [localhost:3000](http://localhost:3000).

## Deployment

The manifest.yml file is used for application configuration on the Predix platform. No edits are required, but you can update the **name** to a custom application name and remove the **random-route** attribute.

Use the following commands to compile code and push to Predix:

```Shell
yarn build
cf push [-n <APP_NAME>]
```

Optional Parameters:

- `-n`: Provide a custom app name (also used for the URL)
