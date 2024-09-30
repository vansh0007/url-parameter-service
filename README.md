# URL Parameter Appender

## Overview

This project is a web application that allows users to append custom parameters to URLs. It consists of a backend server built with Node.js and TypeScript, a frontend application built with React, and a Redis server for caching.

## Features

- Append custom parameters to existing URLs.
- Validate URLs and parameters before processing.
- Persist URLs and their parameters in a MongoDB database.
- Fetch and display a list of saved links with pagination.
- Error handling for invalid inputs and network issues.
- Caching with Redis to improve performance.

## Technologies Used

- **Backend:** Node.js, Express, TypeScript, MongoDB, Redis
- **Frontend:** React, TypeScript, Tailwind CSS
- **Validation:** Joi for backend validation
- **Caching:** Redis

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (running locally or use a cloud service)
- Redis (running locally or use a cloud service)
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB and Redis configurations:
   ```plaintext
   MONGODB_URI=<your_mongodb_connection_string>
   REDIS_HOST=<your_redis_host>
   REDIS_PORT=<your_redis_port>
   PORT=3001
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory if necessary (for example, if you're using a different API URL):
   ```plaintext
   REACT_APP_API_URL=http://localhost:3001/api/v1
   ```

4. Start the frontend application:
   ```bash
   npm start
   ```

### Redis Setup

1. Ensure Redis is installed and running on your local machine or use a Redis cloud service.
2. If running locally, you can start Redis with the following command:
   ```bash
   redis-server
   ```

## API Endpoints

- **POST** `/append-parameters`: Append parameters to a URL.
  - Request Body: 
    ```json
    {
      "url": "http://example.com",
      "parameters": {
        "key1": "value1",
        "key2": "value2"
      }
    }
    ```

- **GET** `/links`: Retrieve all persisted links with pagination.
  - Query Parameters:
    - `page`: Page number (default: 1)
    - `limit`: Number of links per page (default: 10)

## Error Handling

The application includes comprehensive error handling for both frontend and backend, providing users with meaningful error messages for different scenarios (e.g., validation errors, network issues).

 