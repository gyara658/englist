import React, { useState, useMemo, useRef, useReducer, useEffect } from 'react'
import { Link }  from "react-router-dom"
import TinderCard from "react-tinder-card";
import "./TinderCards.css";

import {
  initialState,
  wordsActionTypes,
  wordsReducer
} from "../../../reducers/wordtype"

import { getEnglishlist } from "../../../lib/api/englishlist"

import ReactCardFlip from 'react-card-flip';

const SwipeCard = (props) => {
  const {words} = props
  let count = 0

  const [isFlipped, setIsFlipped] = useState(false);
  const [targetWord, setTargetWord] = useState(words)

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  }

  useEffect(() => {
    setTargetWord(words)
  }, [targetWord])
  console.log(targetWord)

  return (
    <>
      { targetWord ?
        <div className="card">
          <ReactCardFlip isFlipped={isFlipped}  flipSpeedFrontToBack={1.0}
            flipSpeedBackToFront={1.0} flipDirection="vertical" infinite="true" width="300px">
            <div className="front" onClick={flipCard}>
              <ul>
                <li>
                  {targetWord[count].word}
                </li>
              </ul>
              <p>Click Here!!!</p>
            </div>
            <div className="back" onClick={flipCard}>
              <ul>
                <li>
                  <p>意味</p>
                  {targetWord[count].commentary}
                </li>
                <li>
                  <p>例文</p>
                  {targetWord[count].example}
                </li>
                <li>
                  <p>例文訳</p>
                  {targetWord[count].exampleMeaning}
                </li>
              </ul>
            </div>
          </ReactCardFlip>
        </div> : <p>Now Loading!</p>}
    </>
    )
}

export default SwipeCard
