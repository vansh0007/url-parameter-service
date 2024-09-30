
import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES } from '../utils/messages';

/**
 * The error handler middleware.
 * 
 * @param {Error} err The error which occurred while processing the request.
 * @param {Request} req The Express request object.
 * @param {Response} res The Express response object.
 * @param {NextFunction} next The next middleware in the chain.
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error in the console
  console.error('Error occurred:', err);

  // Send a 500 response with a generic error message
   res.status(500).send({ error: ERROR_MESSAGES.GENERAL_ERROR });
};
