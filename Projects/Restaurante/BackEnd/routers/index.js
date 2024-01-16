import * as common from './common.js';
import * as routers from './routers.js';

export const commonRouters = common;

export const {
  UserRouter,
  FoodRouter,
  FoodCategoryRouter,
  OrderRouter,
  InvoiceRouter
} = routers;
