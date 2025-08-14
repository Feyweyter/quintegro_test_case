import { Request, Response, NextFunction } from 'express';

export const delayMiddleware = (delayMs: number = 3000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
      next();
    }, delayMs);
  };
};
