import axios from "axios"

export const Api = axios.create({
  timeout: 20000,
  baseURL: import.meta.env.VITE_API,
})
