import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
  ),
});

export function apiMethodLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { method, path, params, query, body } = req;
  const message = `[${method}] ${path} - params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;
  logger.info(message);
  next();
}
