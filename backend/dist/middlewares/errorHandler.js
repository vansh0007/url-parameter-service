"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    res.status(500).send({ error: 'Something went wrong!' });
};
exports.errorHandler = errorHandler;
