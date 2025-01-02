import { createLogger, format, transports } from 'winston';

export const rootLogger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [new transports.Console()],
});

export const serviceLogger = createLogger({
  format: format.json(),
  transports: [new transports.Console()],
});
