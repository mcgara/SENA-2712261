import axios from 'axios'

/** @param {string} url */
export function createApi(url) {
  return axios.create({ baseURL: url })
}

export function getApiUrlEnv() {
  return process.env['EXPO_PUBLIC_API_URL'] ?? null
}

export default createApi
