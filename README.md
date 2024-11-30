# mnr-req-logger

Opinionated wrapper around [morgan](https://www.npmjs.com/package/morgan) logger middleware for node.js

## You may not need it!

This is a custom highly opinionated solution aimed at code reuse for a few private projects. You'd be better off using [morgan](https://www.npmjs.com/package/morgan) directly.

## v2 Breaking Changes

* From v2, `mnr-req-logger` is an ESM-only module - you are not able to import it with `require()`.

* Bump minimum supported version of Node.js to v20.

Archive documentation:
* [v1](https://github.com/AlexeyGorokhov/mnr-req-logger/blob/master/docs-archives/v1.md);


## Installation

```bash
$ npm install --save mnr-req-logger
```

## Usage example

```typescript
import mnrReqLogger from 'mnr-req-logger';

app.use(mnrReqLogger({
  appName: 'my-cool-app',
  deploymentEnv: 'production'
}));
```

## What It Does

When `process.env.NODE_ENV === 'production'`, mnr-req-logger logs a JSON.stringified object as a single line.

When `process.env.NODE_ENV !== 'production'`, mnr-req-logger logs a single line of the following format:

`<timestamp> [appName] [deploymentEnv] method url statusCode - responseContentLength - responseTime [transactionId]`
