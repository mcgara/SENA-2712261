import { onceCallback, useDotenv } from './utils.js';
import createConnection from './connection.js';
import createConnectionConfig from './connection.config.js';
import models, { createModelConnection } from './models/index.js';
import runDataBase from './run.js';

export const useConnectionConfig = onceCallback(() => createConnectionConfig());
export const useConnection = onceCallback(() => createConnection(useConnectionConfig()));
export const useModelConnection = onceCallback(() => createModelConnection(useConnection()));

export const useUserModel = onceCallback(() => new models.User(useModelConnection()));
export const useFoodModel = onceCallback(() => new models.Food(useModelConnection()));
export const useFoodCategoryModel = onceCallback(() => new models.FoodCategory(useModelConnection()));
export const useOrderModel = onceCallback(() => new models.Order(useModelConnection()));
export const useInvoiceModel = onceCallback(() => new models.Invoice(useModelConnection()));

export const useDataBase = onceCallback(async () => {
  useDotenv();
  return await runDataBase(await useModelConnection());
});
