import { onceCallback } from './utils'
import * as service from './service/index'

export const useApi = onceCallback(() => {
  const url = service.getApiUrlEnv()
  return url ? service.createApi(url) : null
})

export const useUserRoute = onceCallback(() => new service.UserRoute(useApi()))
export const useFoodRoute = onceCallback(() => new service.FoodRoute(useApi()))
export const useFoodCategoryRoute = onceCallback(() => new service.FoodCategoryRoute(useApi()))
export const useOrderRoute = onceCallback(() => new service.OrderRoute(useApi()))
export const useInvoiceRoute = onceCallback(() => new service.InvoiceRoute(useApi()))
export const useApiRoutes = {
  User: useUserRoute,
  Food: useFoodRoute,
  FoodCategory: useFoodCategoryRoute,
  Order: useOrderRoute,
  Invoice: useInvoiceRoute
}
