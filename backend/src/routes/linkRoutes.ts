// urlRouter.ts
import express from 'express';
import { appendParameters, getLinks } from '../controllers/linkController';

export const urlRouter = express.Router();

urlRouter.post('/append-parameters', (req, res, next) => {
  appendParameters(req, res).catch(next);
});

urlRouter.get('/links', (req, res, next) => {
  getLinks(req, res).catch(next);
});