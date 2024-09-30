import express from 'express';
import dotenv from 'dotenv';
import { urlRouter } from './routes/linkRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { connectDB } from './config/db';
import {  SUCCESS_MESSAGES } from './utils/messages';
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Error handler
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1', urlRouter);

// Start the server
app.listen(PORT, () => {
  console.log(SUCCESS_MESSAGES.SERVER_RUNNING(PORT));
});
