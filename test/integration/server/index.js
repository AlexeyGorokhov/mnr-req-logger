'use strict';

const http = require('http');
const express = require('express');
const mnrTransactionId = require('mnr-transaction-id');

const mnrReqLogger = require('../../../index');

const app = express();

app.use(mnrTransactionId);

app.use(mnrReqLogger({
  appName: 'my-cool-app',
  deploymentEnv: 'production'
}));

app.get('/foo', (req, res) => {
  res.status(200).json({ foo: 'bar' });
});

const server = http.createServer(app);
server.listen(5500);
