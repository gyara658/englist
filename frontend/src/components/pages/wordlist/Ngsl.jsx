import React, { useState, useEffect } from 'react'
import { Link }  from "react-router-dom"

import { getEnglishlist } from "../../../lib/api/englishlist"


const Ngsl = () => {
  const [words, setWords] =useState([])


  useEffect(() => {
    getEnglishlist()
    .then((data) =>
      console.log(data),
    )
  }, [])

    return (
      <>
        <p>NGSLページです</p>
        <Link to="/list">・Listページに戻る</Link>

      </>
    )
}

export default Ngsl
