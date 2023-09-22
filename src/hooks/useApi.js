import axios from "axios"
import config from "../config"
import { signOut } from "next-auth/react"

let api

export function createApi() {
  api = axios.create({
    baseURL: config.apiUrl,
    // withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      if (
        error.response?.status === 401 &&
        error.response?.data.message === "User not found"
      ) {
        await signOut()
        deleteToken()
        window.location.href = "/login"
      }
      return Promise.reject(error)
    }
  )

  return api
}

export function setToken(token) {
  // localStorage.setItem("token", token)
  if (!api) {
    createApi()
  }
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export function deleteToken() {
  // localStorage.removeItem("token")
  // localStorage.removeItem("provider")
  delete api.defaults.headers.common["Authorization"]
}

export function useApi() {
  if (!api) {
    createApi()
  }
  return api
}
