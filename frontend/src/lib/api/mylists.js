import client from "./client"
import Cookies from "js-cookie"

export const createMyLists = (data) => {
  return client.post("mylists", data)
}
