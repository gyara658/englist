import React, { useState, useEffect } from 'react'

import "./TinderCards.css";

import Button from '@material-ui/core/Button';

import ReactCardFlip from 'react-card-flip';
import { createMyLists } from "../../../lib/api/mylists"

const SwipeCard = (props) => {
  const {words} = props
  const [count, setCount] = useState(0)

  const [isFlipped, setIsFlipped] = useState(false);
  const [targetWord, setTargetWord] = useState(words)
  const [lists, setLists] = useState([])

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  }

  useEffect(() => {
    setTargetWord(words)
  }, [targetWord])


  const handleSubmit = async (count) => {
    count.preventDefault()


    const res = await createMyLists(count)
    console.log(res)

    if (res.status === 200) {
      setLists([...lists,])
    }
  }


  return (
    <>
      { targetWord.length > 0 ?
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
          <button onClick={() => setCount(count + 1)}>Next Word!</button>
        </div>
        : <p>Now Loading!</p>}
    </>
    )
}

export default SwipeCard
