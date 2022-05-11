import React, { useContext } from "react"
import { Routes, Route, Link } from "react-router-dom"


import Ngsl from "./Ngsl"
import Nawl from "./Nawl"
import Tsl  from "./Tsl"

const List = () => {
  return (
    <>
      <p>Listページです。</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <br />
        <li>
          <Link to="/list/ngsl">NGSL</Link>
          <p>約2800語の単語リストです。2013年に公開されました。<br />一般的英文の9割をカバーすると言われています。</p>
        </li>
        <li>
          <Link to="/list/nawl">NAWL</Link>
          <p>約960語の単語リストです。2013年に公開されました。<br />NGSLとMAWLで学術的英文の基本英単語の92％カバーすると言われています。</p>
        </li>
        <li>
          <Link to="/list/tsl">TSL</Link>
          <p>2016年に公開された、TOEICに頻出する約1200の単語リストです。<br />NGSLとTSLでTOEICの99％の英単語をカバーすると言われています。</p>
        </li>
      </ul>

    </>
  )
}

export default List
