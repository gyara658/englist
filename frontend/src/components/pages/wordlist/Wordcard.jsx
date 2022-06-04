import React, { useReducer, useEffect } from 'react'
import { Link }  from "react-router-dom"

import FlipCard from "./FlipCard"

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton'

import {
  initialState,
  wordsActionTypes,
  wordsReducer
} from "../../../reducers/wordtype"

import { getEnglishlist } from "../../../lib/api/englishlist"


const Wordcard = (props) => {
  const { wtype } = props

  const [state, dispatch] = useReducer(wordsReducer, initialState);

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
          })
        )
      }
  }

  useEffect(() => {
    GetEnglish()
  }, [])

  return (
    <>
      <h2>{wtype}ページ</h2>
      { state.fetchState === "LOADING" ?
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <p>Now Loading! <br/> Please Wait a minute!!!</p>
        </Box>
       : <FlipCard words={state.wordlist} />
      }
    </>
  )
}

export default Wordcard
