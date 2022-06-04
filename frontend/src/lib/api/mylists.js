import client from "./client"
import Cookies from "js-cookie"

// export const getLists = () => {
//   return client.get("lists", { headers: {
//     "access-token": Cookies.get("_access_token"),
//     "client": Cookies.get("_client"),
//     "uid": Cookies.get("_uid")
//   }})
// }


export const getLists = () => {
  return client.get("lists")
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}

export const createMyLists = (userid,data) => {
  return client.post("lists", data)
}
