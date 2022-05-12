import React, { useEffect, useReducer } from 'react'
import { Link }  from "react-router-dom"

import { getEnglishlist } from "../../../lib/api/englishlist"

import {
  initialState,
  wordsActionTypes,
  wordsReducer
} from "../../../reducers/wordtype"

const Wordcard = (props) => {
  const { wtype } = props
  const [state, dispatch] = useReducer(wordsReducer, initialState);
  useEffect(() => {
    getEnglishlist()
    .then((data) =>
      console.log((data)))
  }, [])

  useEffect(() => {
    dispatch({type:wordsActionTypes.FETCHING})
    getEnglishlist()
    .then((data) =>
      dispatch({
        type:wordsActionTypes.FETCH_SUCCESS,
        payload: {
          wordtype:data.wordlist.filter(type => {
            return type.wordtype === wtype
          })
        }
      })
    )
  },[])

    return (
      <>
        <h2>{wtype}ページ</h2>
        <Link to="/list">・Listページに戻る</Link>
        {
          state.wordlist.map(word =>
            <div>
              {word.word}
              <br />
              {word.wordtype}
            </div>
          )
        }
      </>
    )
}

export default Wordcard
