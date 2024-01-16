import { models } from "../database";

export type ModelConnection = ReturnType<typeof models.createModelConnection>

export type UserModel = InstanceType<typeof models.UserModel>
export type FoodModel = InstanceType<typeof models.FoodModel>
export type FoodCategoryModel = InstanceType<typeof models.FoodCategoryModel>
export type OrderModel = InstanceType<typeof models.OrderModel>
export type InvoiceModel = InstanceType<typeof models.InvoiceModel>

export type ModelDataBase = UserModel | FoodModel | FoodCategoryModel | OrderModel | InvoiceModel

export interface IApiRoutes {
  '/user': UserModel
  '/food': FoodModel
  '/food_category': FoodCategoryModel
  '/order': OrderModel
  '/invoice': InvoiceModel
}

export type ApiRoutes = { [P in keyof IApiRoutes]: P }[keyof IApiRoutes]
