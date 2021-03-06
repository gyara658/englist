import React, { createContext, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import  CommonLayout  from "./components/layouts/CommonLayout"
import Home from "./components/pages/Home"

import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"
import NotFound from "./components/pages/NotFound"
import List from "./components/pages/wordlist/List"
import Ngsl from "./components/pages/wordlist/Ngsl"
import Nawl from "./components/pages/wordlist/Nawl"
import Tsl from "./components/pages/wordlist/Tsl"
import Mylist from "./components/pages/wordlist/Mylist"


import { getCurrentUser } from "./lib/api/auth"

export const AuthContext = createContext()

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res)

      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.currentUser);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);


  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            loading,
            setLoading,
            isSignedIn,
            setIsSignedIn,
            currentUser,
            setCurrentUser,
          }}
        >
          <CommonLayout>
            <Routes>
              <Route path="/*" element={<List />} />
                <Route path="/ngsl" element={<Ngsl />} />
                <Route path="/nawl" element={<Nawl />} />
                <Route path="/tsl" element={<Tsl />} />
              <Route path="/user/:id" element={<Home />} />
              <Route path="/user/:id/list" element={<Mylist />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CommonLayout>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
