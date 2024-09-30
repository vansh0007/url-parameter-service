"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrlParams = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUrlParams = (data) => {
    const schema = joi_1.default.object({
        url: joi_1.default.string().uri().required(),
        params: joi_1.default.object().pattern(joi_1.default.string(), joi_1.default.string()).required(),
    });
    return schema.validate(data);
};
exports.validateUrlParams = validateUrlParams;
