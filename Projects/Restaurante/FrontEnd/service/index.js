import * as api from './api'
import * as commonRoutesLib from './routes.common'
import * as routes from './routes'

export const { createApi, getApiUrlEnv } = api
export const commonRoutes = commonRoutesLib
export const {
  UserRoute,
  FoodRoute,
  FoodCategoryRoute,
  OrderRoute,
  InvoiceRoute
} = routes
