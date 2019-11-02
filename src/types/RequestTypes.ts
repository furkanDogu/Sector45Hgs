import { Request, Response, NextFunction } from 'express';

export type RequestHandler<T> = (req: Request, res: Response, next: NextFunction) => T;
