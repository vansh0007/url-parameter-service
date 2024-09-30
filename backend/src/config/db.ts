import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/messages'; // Assuming you have these defined

dotenv.config();

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI ?? '';

    if (!mongoUri) {
      throw new Error(ERROR_MESSAGES.MONGO_ENV_ERROR);
    }

    await mongoose.connect(mongoUri, {});
    console.log(SUCCESS_MESSAGES.MONGO_CONNECTED);
  } catch (error) {
    console.error(`${ERROR_MESSAGES.MONGO_CONNECTION_ERROR} ${error}`);
    process.exit(1); // Exit the process with a failure code
  }
};
