import axios from 'axios'
import { camelize } from '@ridi/object-case-converter'

export const BASE_URL = 'https://jsonplaceholder.typicode.com/'
console.log('BASE_URL', BASE_URL)
export const instancePlaceholder = axios.create({
  baseURL: BASE_URL,
  transformRequest: (data) => {
    if (!data) return data
    return Object.entries(data).reduce((url, [key, value], i) => {
      const separator = i === 0 ? '' : '&'
      const params = `${key}=${encodeURIComponent(value)}`
      return `${url}${separator}${params}`
    }, '')
  },
  transformResponse: (response) => {
    try {
      return camelize(JSON.parse(response), { recursive: true })
    } catch (e) {
      return response
    }
  },
})
