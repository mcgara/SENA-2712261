import express from 'express';
import { onceCallback } from './utils.js';
import {
  useUserRoute,
  useTaskRoute
} from './routes/index.js';

const app = express();

const useApp = onceCallback(async () => {
  app.use('/user', await useUserRoute());
  app.use('/task', await useTaskRoute());

  return app;
})

export default useApp;
