import type { ApiRoutes, IApiRoutes as IApiRoutesModel } from '../../BackEnd/routers/types'
import type { ITableModel } from '../../DataBase/models/types'
import * as routes from './routes'

export type ApiRoutes = ApiRoutes
type _IApiRoutesData = { [P in ApiRoutes]: ITableModel[IApiRoutesModel[P]['tableName']] }
export interface IApiRoutesData extends _IApiRoutesData {}
export type ApiRoutesData = { [P in ApiRoutes]: IApiRoutesData[P] }[ApiRoutes]

export type UserRoute = InstanceType<typeof routes.UserRoute>
export type FoodRoute = InstanceType<typeof routes.FoodRoute>
export type FoodCategoryRoute = InstanceType<typeof routes.FoodCategoryRoute>
export type OrderRoute = InstanceType<typeof routes.OrderRoute>
export type InvoiceRoute = InstanceType<typeof routes.InvoiceRoute>

export type AllApiRoutes = UserRoute | FoodRoute | FoodCategoryRoute | OrderRoute | InvoiceRoute
type _IApiRoutes = { [T in AllApiRoutes as T['route']]: T }
export interface IApiRoutes extends _IApiRoutes {}
