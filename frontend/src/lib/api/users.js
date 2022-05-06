import client from "./client"

import Cookies from "js-cookie"

export const getUser = (id) => {
  return client.get(`users/${id}`)
}

export const updateUser = (id | undefined | null, data) => {
  return client.put(`users/${id}`, data)
}
