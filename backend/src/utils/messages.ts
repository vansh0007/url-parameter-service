
export const ERROR_MESSAGES = {
    INVALID_PARAMS: 'Invalid URL parameters.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    NO_LINKS_FOUND: 'No links found.',
    GENERAL_ERROR: 'Something went wrong!',
    MONGO_CONNECTION_ERROR: 'MongoDB connection error:',
    MONGO_ENV_ERROR: 'MongoDB URI is not defined in environment variables!',
    DB_VALIDATION_ERROR: 'Database validation error occurred. Please check the input values.',
    DUPLICATE_URL_ERROR: 'The URL already exists in the database. Duplicate entry not allowed.',
    DB_SAVE_ERROR: 'Failed to save the URL and parameters to the database.',

    

  // Redis-related error messages
    REDIS_CONNECTION_ERROR: 'Redis connection error',
    REDIS_GENERAL_ERROR: 'Error connecting to Redis',
  };

  export const SUCCESS_MESSAGES = {
    MONGO_CONNECTED: 'Connected to MongoDB Atlas',
    SERVER_RUNNING: (port: string | number) => `Server is running on port ${port}`,
    REDIS_CONNECTION_SUCCESS: 'Connected to Redis',
    URL_SAVED: (url: string) => `Successfully saved URL: ${url}`,
  };
  
  