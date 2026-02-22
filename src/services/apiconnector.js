import axios from "axios"
import { toast } from "react-hot-toast"
import { store } from "../store/index.js"
import { setToken } from "../slices/authSlice"
import { setUser } from "../slices/profileSlice"
import { resetCart } from "../slices/cartSlice"

export const axiosInstance = axios.create({})

// Intercept 401 (unauthorized/token expired) and logout user
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(setToken(null))
      store.dispatch(setUser(null))
      store.dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.error("Session expired. Please log in again.")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  })
}   