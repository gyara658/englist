import React, { useState, useMemo, useRef } from 'react'
import TinderCard from "react-tinder-card";
import "./TinderCards.css";


import Swiper from 'react-id-swiper';

const api = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const api2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const Swipe = () => {
  const [users, setUsers] = useState(api);
  const [currentIndex, setCurrentIndex] = useState(api.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(api.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }


 const canGoBack = currentIndex < api.length - 1

  const canSwipe = currentIndex >= 0

  const swiped = (direction, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
   console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
   // handle the case in which go back is pressed before card goes outOfFrame
   currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
   // TODO: when quickly swipe and restore multiple times the same card,
   // it happens multiple outOfFrame events are queued and the card disappear
   // during latest swipes. Only the last outOfFrame event should be considered valid
 }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < api.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }
  return (
    <>


          <div className="Swipe">
            {users?.length &&
              users.map((user, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className='swipe'
            key={user.name}
            onSwipe={(dir) => swiped(dir, index)}
            onCardLeftScreen={() => outOfFrame(index)}
                >
                  <div className="Card" key={user}>
                    {user}
                  </div>
                </TinderCard>
              ))}
        </div>
        <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
    </>
  );
}

export default Swipe;
