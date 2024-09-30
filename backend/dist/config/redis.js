"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Log Redis connection info
console.log(`Connecting to Redis at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
// Create a Redis client
const redisClient = (0, redis_1.createClient)({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
// Handle connection errors
redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});
// Handle successful connection
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
// Connect the Redis client
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
    }
    catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}))();
// Export the Redis client for use in other modules
exports.default = redisClient;
