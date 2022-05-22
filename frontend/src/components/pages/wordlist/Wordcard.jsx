import React, { useState, useMemo, useRef, useReducer, useEffect } from 'react'
import { Link }  from "react-router-dom"
import "./TinderCards.css";

import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';

import ReactCardFlip from 'react-card-flip';

import Swiper from 'react-id-swiper';

import {useSelector, useDispatch} from 'react-redux'
import SwipeCard from "./SwipeCard"

import {
  initialState,
  wordsActionTypes,
  wordsReducer
} from "../../../reducers/wordtype"

import { getEnglishlist } from "../../../lib/api/englishlist"


const Wordcard = (props) => {
  const { wtype, len } = props

  const [isFlipped, setIsFlipped] = useState(false);
  const [state, dispatch] = useReducer(wordsReducer, initialState);
  const [targetWord, setTargetWord] = useState()
  const [words, setWords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(len)
  const [lastDirection, setLastDirection] = useState()
  const [show, setShow] = useState(false)
  const currentIndexRef = useRef(currentIndex)
  let count = 0


  console.log(currentIndex)
  useEffect(() => {
    dispatch({type:wordsActionTypes.FETCHING})
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
  },[])



  console.log(targetWord)
  console.log(state.wordlist)

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  }

  const nextword = (count) => {
    setTargetWord(count + 1)

  }

  return (
    <>
      <h2>{wtype}ページ</h2>
      <Link to="/list">・Listページに戻る</Link>

        <SwipeCard words={state.wordlist} />


    </>
  )
}

export default Wordcard

// <div className="swipe">
// <SwipeableViews enableMouseEvents>
//       <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
//       <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
//       <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
// </SwipeableViews>
// </div>


//   {
//     state.wordlist.sort(function (a, b) {
//       if (a.id < b.id) {
//         return 1;
//       }
//       if (a.id > b.id) {
//         return -1;
//       }
//       return 0;
//     })
//       .map((word, index) => (
//         <div className="card">
//         <ReactCardFlip isFlipped={isFlipped}  flipSpeedFrontToBack={1.0}
//           flipSpeedBackToFront={1.0} flipDirection="vertical" infinite="true" width="300px">
//           <div className="front" onClick={flipCard}>
//             <SwipeableViews enableMouseEvents>
//             <div>
//             {word.word}
//             {word.id}
//             {index}
//             {currentIndex}
//             </div>
//             </SwipeableViews>
//             </div>
//             <div className="back" onClick={flipCard}>
//               {word.meaning}
//             </div>
//           </ReactCardFlip>
//
//         </div>
//       )
//     )
// }



// <div className="card">
//   <ReactCardFlip isFlipped={isFlipped}  flipSpeedFrontToBack={1.0}
//     flipSpeedBackToFront={1.0} flipDirection="vertical" infinite="true" width="300px">
//     <div className="front" onClick={flipCard}>
//       {targetWord[count].word}
//       <p>Click Here!!!</p>
//     </div>
//     <div className="back" onClick={flipCard}>
//       <ul>
//         <li>
//           <p>意味</p>
//           {targetWord[count].commentary}
//         </li>
//         <li>
//           <p>例文</p>
//           {targetWord[count].example}
//         </li>
//         <li>
//           <p>例文訳</p>
//           {targetWord[count].exampleMeaning}
//         </li>
//       </ul>
//     </div>
//   </ReactCardFlip>
// </div>


// { targetWord ?
//   <div className="card">
//     <ReactCardFlip isFlipped={isFlipped}  flipSpeedFrontToBack={1.0}
//       flipSpeedBackToFront={1.0} flipDirection="vertical" infinite="true" width="300px">
//       <div className="front" onClick={flipCard}>
//         <ul>
//           <li>
//             {targetWord[count].word}
//           </li>
//         </ul>
//         <p>Click Here!!!</p>
//       </div>
//       <div className="back" onClick={flipCard}>
//         <ul>
//           <li>
//             <p>意味</p>
//             {targetWord[count].commentary}
//           </li>
//           <li>
//             <p>例文</p>
//             {targetWord[count].example}
//           </li>
//           <li>
//             <p>例文訳</p>
//             {targetWord[count].exampleMeaning}
//           </li>
//         </ul>
//       </div>
//     </ReactCardFlip>
//   </div> : <p>Now Loading!</p>
// }
