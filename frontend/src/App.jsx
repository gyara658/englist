import React, { createContext, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import  CommonLayout  from "./components/layouts/CommonLayout"
import Home from "./components/pages/Home"
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"

import { getCurrentUser } from "./lib/api/auth"
import { execTest } from "./lib/api/test"


export const AuthContext = createContext()

const App = () => {
  // const [message, setMessage] = useState("")
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

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Navigate to="signin" />;
      }
    } else {
      return <></>;
    }
  };
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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
