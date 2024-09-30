// redisClient.ts
import { createClient } from 'redis';
import dotenv from 'dotenv';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/messages'; // Import error messages

// Load environment variables from .env file
dotenv.config();

// Log Redis connection info
console.log(`Connecting to Redis at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);

// Create a Redis client
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

// Handle connection errors
redisClient.on('error', (err) => {
  console.error(ERROR_MESSAGES.REDIS_CONNECTION_ERROR, err);
});

// Handle successful connection
redisClient.on('connect', () => {
  console.log(SUCCESS_MESSAGES.REDIS_CONNECTION_SUCCESS);
});

// Connect the Redis client
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error(ERROR_MESSAGES.REDIS_GENERAL_ERROR, error);
  }
})();

// Export the Redis client for use in other modules
export default redisClient;
