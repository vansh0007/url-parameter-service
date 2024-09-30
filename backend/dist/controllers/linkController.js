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
exports.getLinks = exports.appendParameters = void 0;
const linkService_1 = require("../services/linkService");
const redis_1 = __importDefault(require("../config/redis"));
const appendParameters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, parameters } = req.body;
        if (!url || !parameters) {
            res.status(400).json({ error: 'URL and parameters are required' });
            return;
        }
        const result = yield linkService_1.UrlService.appendParameters(url, parameters);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error appending parameters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.appendParameters = appendParameters;
const getLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const noCache = req.query.noCache === 'false'; // Check for noCache query parameter
    const cacheKey = `links:${page}:${limit}`;
    try {
        // If noCache is true, skip cache and fetch directly from the database
        if (noCache) {
            console.log('Skipping cache as requested');
            // Optionally, you could clear the cache if needed
            yield redis_1.default.del(cacheKey);
            // Fetch data from the primary database
            const result = yield linkService_1.UrlService.getLinks(page, limit);
            if (!result || result.links.length === 0) {
                res.status(404).json({ error: 'No links found.' });
                return;
            }
            // Return the data directly from the database without caching it
            res.json(result);
            return;
        }
        // Attempt to get data from Redis if noCache is false
        const cachedData = yield redis_1.default.get(cacheKey);
        if (cachedData) {
            console.log('Fetching from cache:', cacheKey);
            res.json(JSON.parse(cachedData));
            return;
        }
        // Fetch data from the primary database if no cache was found
        const result = yield linkService_1.UrlService.getLinks(page, limit);
        if (!result || result.links.length === 0) {
            res.status(404).json({ error: 'No links found.' });
            return;
        }
        // Cache the result in Redis (set expiration time to 5 minutes)
        yield redis_1.default.setEx(cacheKey, 60 * 5, JSON.stringify(result));
        // Return the data from the database
        res.json(result);
    }
    catch (error) {
        console.error('Error fetching links:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getLinks = getLinks;
