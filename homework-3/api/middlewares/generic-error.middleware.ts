import { Request, Response, NextFunction } from 'express';

export function genericErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err) {
    res.status(500).json({ error: `Failed to process request: ${err.name} ${err.message}` });
  }
  next();
}
