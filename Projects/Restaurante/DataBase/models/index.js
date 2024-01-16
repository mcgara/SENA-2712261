import * as connection from './connection.js';
import * as common from './common.js';
import * as models from './models.js';

export const {
  File,
  FilePath,
  createModelConnection
} = connection;

export const commonModel = common;

export const {
  UserModel,
  FoodModel,
  FoodCategoryModel,
  OrderModel,
  InvoiceModel
} = models;

export default {
  User: UserModel,
  Food: FoodModel,
  FoodCategory: FoodCategoryModel,
  Order: OrderModel,
  Invoice: InvoiceModel
}
