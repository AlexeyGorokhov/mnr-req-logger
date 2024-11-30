/**
 * Opinionated wrapper around morgan logger middleware for node.js.
 *
 * @packageDocumentation
 */

import morgan, { type TokenIndexer } from 'morgan';
import http from 'node:http';

let _appName: string = '';
let _deploymentEnv: string = '';

/**
 * Logger options
 *
 * @public
 */
export type MnrLoggerOptions = {
  appName: string;
  deploymentEnv: string;
};

/**
 * @public
 */
export default function mnrReqLogger(opts: MnrLoggerOptions): ReturnType<typeof morgan> {
  const { appName, deploymentEnv } = opts;

  _appName = appName;
  _deploymentEnv = deploymentEnv;

  return morgan(logFormatter);
};

function logFormatter<
  Request extends http.IncomingMessage = http.IncomingMessage,
  Response extends http.ServerResponse = http.ServerResponse,
>(tokens: TokenIndexer, req: Request, res: Response): string {
  const timestamp = new Date().toISOString();

  if (process.env['NODE_ENV'] === 'production') {
    return JSON.stringify({
      timestamp,
      appName: _appName,
      deploymentEnv: _deploymentEnv,
      ...tokens['method'] ? { method: tokens['method'](req, res) } : {},
      ...tokens['url'] ? { url: tokens['url'](req, res) } : {},
      ...tokens['status'] ? { status: tokens['status'](req, res) } : {},
      ...tokens['res'] ? { resPayload: tokens['res'](req, res, 'content-length') } : {},
      ...tokens['response-time'] ? { resTimeMs: tokens['response-time'](req, res) } : {},
      ...'transactionId' in req ? { transactionId: req.transactionId } : {},
    });
  } else {
    return [
      timestamp,
      `[${_appName}]`,
      `[${_deploymentEnv}]`,
      ...tokens['method'] ? [tokens['method'](req, res)] : [],
      ...tokens['url'] ? [tokens['url'](req, res)] : [],
      ...tokens['status'] ? [tokens['status'](req, res)] : [],
      '-',
      ...tokens['res'] ? [tokens['res'](req, res, 'content-length')] : [],
      '-',
      ...tokens['response-time'] ? [tokens['response-time'](req, res)] : [],
      'ms',
      ...'transactionId' in req && typeof req.transactionId === 'string'
        ? [`[${req.transactionId}]`]
        : [],
    ].join(' ');
  }
}
