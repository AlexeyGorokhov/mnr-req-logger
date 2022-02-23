import morgan from 'morgan';

export interface MnrLoggerOptions {
  appName: string;
  deploymentEnv: string;
}

export default function mnrReqLogger(opts: MnrLoggerOptions): ReturnType<typeof morgan>;
