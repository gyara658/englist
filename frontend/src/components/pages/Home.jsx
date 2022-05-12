import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../App"

const Home = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  return  (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h1>Signed In successfully!</h1>
            <h2>Email: { currentUser?.email }</h2>
            <h2>Name: { currentUser?.name }</h2>
          </>
        ) : (
          <h1>Not signed in</h1>
        )
      }


        <Link to="/list">List</Link>


    </>
  )
}

export default Home
