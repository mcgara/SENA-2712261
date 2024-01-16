import { Router } from 'express';
import { onceCallback, useDotenv } from './utils.js';
import createApp from './app.js';
import createAppConfig from './app.config.js';
import * as routes from './routers/index.js';
import { defaultDataBase as db } from './database.js';
import runBackEnd from './run.js';

export const useApp = onceCallback(() => createApp());
export const useAppConfig = onceCallback(() => createAppConfig());

export const useUserRoute = onceCallback(() => new routes.UserRouter(Router(), db.useUserModel()));
export const useFoodRoute = onceCallback(() => new routes.FoodRouter(Router(), db.useFoodModel()));
export const useFoodCategoryRoute = onceCallback(() => new routes.FoodCategoryRouter(Router(), db.useFoodCategoryModel()));
export const useOrderRoute = onceCallback(() => new routes.OrderRouter(Router(), db.useOrderModel()));
export const useInvoiceRoute = onceCallback(() => new routes.InvoiceRouter(Router(), db.useInvoiceModel()));

export const useAppRoutes = onceCallback(() => {
  const app = useApp();

  app.use(useUserRoute().router);
  app.use(useFoodRoute().router);
  app.use(useFoodCategoryRoute().router);
  app.use(useOrderRoute().router);
  app.use(useInvoiceRoute().router);

  useUserRoute().setAll();
  useFoodRoute().setAll();
  useFoodCategoryRoute().setAll();
  useOrderRoute().setAll();
  useInvoiceRoute().setAll();

  return app;
});

export const useBackEnd = onceCallback(() => {
  useDotenv();
  useAppRoutes();
  return runBackEnd(useApp(), useAppConfig());
});
