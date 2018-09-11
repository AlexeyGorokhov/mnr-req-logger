'use strict';

const morgan = require('morgan');

let _appName;
let _deploymentEnv;

module.exports = function mnrReqLogger (opts) {
  const { appName, deploymentEnv } = opts;
  _appName = appName;
  _deploymentEnv = deploymentEnv;

  return morgan(logFormatter);
};

function logFormatter (tokens, req, res) {
  const timestamp = new Date().toISOString();

  if (process.env.NODE_ENV === 'production') {
    return JSON.stringify({
      timestamp,
      appName: _appName,
      deploymentEnv: _deploymentEnv,
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      resPayload: tokens.res(req, res, 'content-length'),
      resTimeMs: tokens['response-time'](req, res),
      ...(req.transactionId ? { transactionId: req.transactionId } : {})
    });
  } else {
    return [
      timestamp,
      `[${_appName}]`,
      `[${_deploymentEnv}]`,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res), '-',
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      ...(req.transactionId ? [`[${req.transactionId}]`] : [])
    ].join(' ');
  }
}
