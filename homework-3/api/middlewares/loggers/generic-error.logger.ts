import winston from 'winston';

export const genericErrorLogger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
  ),
});

