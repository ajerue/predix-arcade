# Predix Arcade

A React-based web UI for [JSNES](https://github.com/bfirsh/jsnes) ready for Predix deployment. Based on [JSNES Web UI](https://github.com/bfirsh/jsnes-web).

## Development Setup

If you're working through my Predix Arcade series, this dashboard is the 2nd step in creating a full Predix Arcade app that monitors an arcade asset (NES emulator). Be sure to go back to any README tutorials that you have not yet completed.

1. [Predix Arcade Data Client](https://github.com/futuregarnet/predix-arcade-data-client#predix-arcade-data-client)
1. **[Predix Arcade](https://github.com/futuregarnet/predix-arcade#predix-arcade)**
1. [Predix Arcade Dashboard Starter Kit](https://github.com/futuregarnet/predix-arcade-dashboard-starter-kit#predix-arcade-dashboard-starter-kit)

Clone or download and extract the source code:

```Shell
git clone https://github.com/futuregarnet/predix-arcade.git
cd predix-arcade
```

### Package Manager Installation

If you don't have them already, you'll need yarn (with Node.js) installed:

1. Install [yarn](https://yarnpkg.com/en/docs/install)

### Dependency Installation

This app uses packages managed by yarn. Issue the following command to install them:

```Shell
yarn
```

### Local Configuration

Predix Arcade needs Predix Time Series-based data client (API) for retriving arcade data. Complete [Step 1](https://github.com/futuregarnet/predix-arcade-data-client.git) to deploy the Predix Arcade Data Client.

Edit the src/config.js file and add the following details:

- **<ASSET_NAME>**: The name for your Predix Arcade (used for Timeseries Tags)
- **<TIMESERIES_API_URL>**: Your Time Series API (Data Client) URL

## Local Development

To start the app locally, issue the command:

```Shell
yarn start
```

This command will compile code for local development and watch changes for file. Your browser should automatically open [localhost:3000](http://localhost:3000).

## Predix Deployment

Use the following commands to compile code and push to Predix:

```Shell
yarn build
cf push [-n <APP_NAME>]
```

Optional Parameters:

- `-n`: Provide a custom app name (also used for the URL)
  - You can also update the **name** attribute in `manifest.yml` to a custom app name and remove the **random-route** attribute to avoid this parameter.
