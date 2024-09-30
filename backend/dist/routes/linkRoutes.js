"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRouter = void 0;
// urlRouter.ts
const express_1 = __importDefault(require("express"));
const linkController_1 = require("../controllers/linkController");
exports.urlRouter = express_1.default.Router();
exports.urlRouter.post('/append-parameters', (req, res, next) => {
    (0, linkController_1.appendParameters)(req, res).catch(next);
});
exports.urlRouter.get('/links', (req, res, next) => {
    (0, linkController_1.getLinks)(req, res).catch(next);
});
