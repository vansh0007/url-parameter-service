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
exports.UrlService = void 0;
const Link_1 = __importDefault(require("../models/Link"));
class UrlService {
    static appendParameters(originalUrl, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(originalUrl);
            Object.entries(parameters).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
            const newUrl = url.toString();
            const urlDoc = new Link_1.default({
                originalUrl,
                parameters,
                newUrl,
            });
            yield urlDoc.save();
            return urlDoc;
        });
    }
    static getLinks(page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(page, limit);
            // Calculate skip and limit
            const skip = (page - 1) * limit;
            const totalDocs = yield Link_1.default.countDocuments();
            const totalPages = Math.ceil(totalDocs / limit);
            const links = yield Link_1.default.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
            return { links, totalPages };
        });
    }
}
exports.UrlService = UrlService;
