import React, { useState, useReducer, useEffect } from 'react'
import { Link }  from "react-router-dom"

import FlipCard from "./FlipCard"

import {
  initialState,
  wordsActionTypes,
  wordsReducer
} from "../../../reducers/wordtype"

import { getEnglishlist } from "../../../lib/api/englishlist"


const Wordcard = (props) => {
  const { wtype } = props

  const [state, dispatch] = useReducer(wordsReducer, initialState);
  const [targetWord, setTargetWord] = useState()

  const GetEnglish = async () => {
    dispatch({type:wordsActionTypes.FETCHING})
    const res = await getEnglishlist()
    console.log(res)

    if (res?.status === 200) {
      getEnglishlist()
        .then((data) =>
          dispatch({
            type:wordsActionTypes.FETCH_SUCCESS,
            payload: {
            wordtype:data.wordlist.filter(type => {
              return (
                type.wordtype === wtype)
              })
            }
          }),setTargetWord(state.wordlist)
        )
      }
  }

  useEffect(() => {
    GetEnglish()
  }, [setTargetWord])


  return (
    <>
      <h2>{wtype}ページ</h2>
      { state.wordlist.length > 0 ?
       <FlipCard words={state.wordlist} />
       :  <p>Now Loading! <br/> Please Wait a minute!!!</p>
      }
    </>
  )
}

export default Wordcard
