import { Request, Response } from 'express';
import { UrlService } from '../services/linkService';
import redisClient from '../config/redis';
import  { IUrl } from '../models/Link';
import { validateUrlParams } from '../utils/validateInput';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/messages';



interface AppendParametersRequest extends Request {
  body: {
    url: string;
    parameters: Record<string, string>;
  };
}


 
/**
 * Handles a POST request to /append-parameters, appending parameters to a URL and returning the new URL.
 * @param req The Express request object, with the URL and parameters in the request body.
 * @param res The Express response object.
 * @returns A promise that resolves to nothing (void).
 */

export const appendParameters = async (req: AppendParametersRequest, res: Response): Promise<void> => {

  try {
    const { error, value } = validateUrlParams(req.body);

    if (error) {
      res.status(400).json({ error: ERROR_MESSAGES.INVALID_PARAMS });
      return;
    }


    const { url, parameters } = value;
    const result = await UrlService.appendParameters(url, parameters);

    if (!result) {
       res.status(500).json({ error: ERROR_MESSAGES.DB_SAVE_ERROR });
       return;
    }
    console.log(SUCCESS_MESSAGES.URL_SAVED(result.newUrl));

    res.status(201).json(result);
  } catch (error) {
    console.error('Error appending parameters:', error);
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};




/**
 * Handles a GET request to /links, returning a list of links.
 * If the result is cached in Redis, it will be returned from the cache.
 * Otherwise, it will be fetched from the primary database and cached in Redis.
 * @param req The Express request object.
 * @param res The Express response object.
 * @returns A promise that resolves to nothing (void).
 */
export const getLinks = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string, 10) ?? 1;
  const limit = parseInt(req.query.limit as string, 10) ?? 10;
  const cacheKey = `links:${page}:${limit}`;
  try {
    // Attempt to get data from Redis
    const cachedData: string | null = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Fetching from cache:', cacheKey);
      res.json(JSON.parse(cachedData));
      return;
    }

    // Fetch data from the primary database
    const result: { links: IUrl[], totalPages: number } | null = await UrlService.getLinks(page, limit);

    if (!result || result.links.length === 0) {
      res.status(404).json({ error: ERROR_MESSAGES.NO_LINKS_FOUND });
      return;
    }

    // Cache the result in Redis (set expiration time to 5 minutes)
    await redisClient.setEx(cacheKey, 300, JSON.stringify(result));

    // Return the data from the database
    console.log('Fetching from primary database:', cacheKey);
    res.json(result);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};