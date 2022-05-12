import React from "react"
import { Link } from "react-router-dom"


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
          <p>約2800語の単語リストです。<br />一般的英文の9割をカバーすると言われています。</p>
        </li>
        <li>
          <Link to="/list/nawl">NAWL</Link>
          <p>約960語の単語リストです。<br />NGSLとMAWLで学術的英文の基本英単語の92％カバーすると言われています。</p>
        </li>
        <li>
          <Link to="/list/tsl">TSL</Link>
          <p>TOEICに頻出する約1200の単語リストです。<br />NGSLとTSLでTOEICの99％の英単語をカバーすると言われています。</p>
        </li>
      </ul>

    </>
  )
}

export default List
