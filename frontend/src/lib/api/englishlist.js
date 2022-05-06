import client from "./client"
import Cookies from "js-cookie"


export const getEnglishlist = () => {
  return client.get("englishlists", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}
