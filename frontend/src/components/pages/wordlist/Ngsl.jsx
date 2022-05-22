import React from 'react'
import Wordcard from "./Wordcard"

const Ngsl = () => {
  const wtype = "NGSL"
  const listlen = 2850
    return (
      <>
        <Wordcard wtype={wtype} len={listlen} />
      </>
    )
}

export default Ngsl
