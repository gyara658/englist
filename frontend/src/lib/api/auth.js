import client from "./client"
import Cookies from "js-cookie"

// サインアップ
export const signUp = (data) => {
  return client.post("auth", data);
};

// サインイン
export const signIn = (data) => {
  return client.post("auth/sign_in", data);
};

// サインアウト
export const signOut = () => {
  return client.delete("auth/sign_out",{
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    }
  });
};

// ログインユーザーの取得
export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  ) return
  return client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    },
  });
};
