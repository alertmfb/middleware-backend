import { Request, Response, NextFunction } from 'express';
import { format } from 'date-fns';
import { rootLogger } from './logger.config';

export function logger(req: Request, res: Response, next: NextFunction) {
  rootLogger.info(
    `${req.method} ${req.url} \t time: ${format(
      new Date(),
      'dd/MM/yyyy HH:mm:ss',
    )}`,
  );

  next();
}
