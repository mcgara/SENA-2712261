import axios from 'axios'
import { createRouter } from './router'

export const API_URL = process.env['EXPO_PUBLIC_API_URL'] ?? null
export const API_ROUTES = {
  USER: '/user',
  TASK: '/task'
}

export const routes = {
  user: createRouter(API_ROUTES.USER),
  task: createRouter(API_ROUTES.TASK)
}

export const api = !API_URL ? null : axios.create({ baseURL: API_URL })
export default {
  API_URL,
  API_ROUTES,
  api,
  routes
}
