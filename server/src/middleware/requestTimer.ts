import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      traceflowStart?: number;
    }
  }
}

export const requestTimer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
//  This will be used in traceflowMiddleware to calculate API response time.
// like  API took 120ms intha maari details track panna use panrom
  req.traceflowStart = Date.now();

  next();
};