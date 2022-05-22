import React, { Component } from 'react';

import { Link }  from "react-router-dom"

import TinderCard from "react-tinder-card";
import "./TinderCards.css";

import {
  initialState,
  wordsActionTypes,
  wordsReducer
} from "../../../reducers/wordtype"

import { getEnglishlist } from "../../../lib/api/englishlist"

const Reactswipeable = () => {
  const { wtype, len } = props
  const [state, dispatch] = useReducer(wordsReducer, initialState)
  useEffect(() => {
    dispatch({type:wordsActionTypes.FETCHING})
    getEnglishlist()
    .then((data) =>
      dispatch({
        type:wordsActionTypes.FETCH_SUCCESS,
        payload: {
          wordtype:data.wordlist.filter(type => {
            return (
              type.wordtype === wtype
            )
          })
        }
      })
    )
  },[])

  const swipingLeft(e, absX) =>  {
    console.log("左スワイプ中", e, absX)
  }

  const swipedLeft(e, deltaX, deltaY, isFlick, velocity) => {
    console.log("左スワイプ終了", deltaX)
  }

  const swipingRight(deltaX) => {
    console.log("右スワイプ中", e, deltaX)
  }

  const swipedRight(deltaX) => {
    console.log("右スワイプ完了", e, deltaX)
  }
  render() {
    return (
      <Swipeable
        onSwipingLeft={this.swipingLeft}
        onSwipedLeft={this.swipedLeft}
        onSwipingRight={this.swipingRight}
        onSwipedRight={this.swipedRight} >
          <p>test</p>
      </Swipeable>
}

export default Reactswipeable
