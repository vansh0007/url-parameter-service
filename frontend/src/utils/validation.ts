import { ERROR_MESSAGES } from './errorMessages';

/**
 * Validate a URL string.
 * @param {string} url - The URL string to validate
 * @param {function} setUrlError - A function to set the error message
 * @returns {boolean} - Whether the URL is valid or not
 */
export const validateUrl = (url: string, setUrlError: (message: string) => void): boolean => {
  try {
    // Attempt to create a new URL object
    new URL(url);
    // If successful, set the error message to an empty string
    setUrlError('');
    // Return true
    return true;
  } catch (e) {
    // If the URL is invalid, set the error message to the appropriate message
    setUrlError(ERROR_MESSAGES.INVALID_URL_FORMAT);
    // Return false
    return false;
  }
};

/**
 * Validate a parameters string.
 * @param {string} params - The parameters string to validate
 * @param {function} setParamsError - A function to set the error message
 * @returns {boolean} - Whether the parameters are valid or not
 */
export const validateParams = (params: string, setParamsError: (message: string) => void): boolean => {
    // Check if the input string is empty
    if (!params) {
      setParamsError(ERROR_MESSAGES.EMPTY_PARAMS);
      return false;
    }
  
    // Split the parameters by '&'
    const pairs = params.split('&');
  
    // Check if there are no key-value pairs
    if (pairs.length === 0) {
      setParamsError(ERROR_MESSAGES.EMPTY_PARAMS);
      return false;
    }
  
    // Define a regex to validate each key-value pair
    const regex = /^[a-zA-Z0-9_]+=[a-zA-Z0-9_\-\.]{1,100}$/;
  
    // Iterate over each key-value pair to provide more detailed error feedback
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
  
      // Check if there is an equal sign in the pair
      if (!pair.includes('=')) {
        setParamsError(`${ERROR_MESSAGES.MISSING_EQUAL_SIGN} at parameter ${i + 1}: "${pair}"`);
        return false;
      }
  
      const [key, value] = pair.split('=');
  
      // Check if key or value is missing
      if (!key || !value) {
        setParamsError(`${ERROR_MESSAGES.MISSING_KEY_OR_VALUE} at parameter ${i + 1}: "${pair}"`);
        return false;
      }
  
      // Validate the key-value pair against the regex
      if (!regex.test(pair)) {
        setParamsError(`${ERROR_MESSAGES.INVALID_PARAM_FORMAT} at parameter ${i + 1}: "${pair}"`);
        return false;
      }
  
      // Optional: Check for length constraints
      if (key.length > 50 || value.length > 100) {
        setParamsError(`${ERROR_MESSAGES.PARAM_LENGTH_EXCEEDED} at parameter ${i + 1}: "${pair}"`);
        return false;
      }
    }
  
    // If all checks pass, clear any previous error message
    setParamsError('');
    return true;
  };
  
