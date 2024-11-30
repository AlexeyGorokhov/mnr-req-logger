import http from 'node:http';
import express from 'express';

import mnrReqLogger from '../../../src/index.js';

const app = express();

app.use(mnrReqLogger({
  appName: 'my-cool-app',
  deploymentEnv: 'production',
}));

app.get('/foo', (req, res) => {
  res.status(200).json({ foo: 'bar' });
});

const server = http.createServer(app);
server.listen(5500);
