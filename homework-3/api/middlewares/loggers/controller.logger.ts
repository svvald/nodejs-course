import winston from 'winston';
import { performance } from 'perf_hooks';

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
  ),
});

export function ControllerLogger() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function decorator(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = async (...args: any): Promise<void> => {
      try {
        const t1 = performance.now();
        await originalMethod.apply(this, args);
        const t2 = performance.now();
        const executionTime = t2 - t1;
        logger.debug(`[${propertyKey}] It took ${executionTime.toFixed(2)}ms to execute`);
      } catch (error) {
        logger.error(`[${propertyKey}] An error occured: ${error.message}`);
        throw new Error(error);
      }
    };
  };
}
