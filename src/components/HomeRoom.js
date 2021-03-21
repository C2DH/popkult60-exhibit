import React, {useEffect} from 'react'
import { useSpring, animated } from 'react-spring'
import {useMousePosition} from '../hooks'
import '../styles/components/HomeRoom.scss'
import background from "../assets/images/room.png"

const calc = (x, y, w, h) => [x - w / 2, y -h / 2]
const trans1 = (xRatio, yRatio) => (x, y) => `translate3d(${x * xRatio / 10}px,${y * yRatio / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
const RatioCoverWidthDivHeight = 1.75
const RatioTrans = 1.1

const HomeRoom = ({ width, height }) => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 1, tension: 50, friction: 10 } }))
  let xRatio;
  let yRatio;
  let coverHeight;
  let coverWidth;
  if (width > height) {
    coverHeight = height * RatioTrans
    coverWidth = coverHeight * RatioCoverWidthDivHeight
    xRatio = coverWidth / width
    yRatio = coverHeight / height
  } else {
    coverHeight = height
    coverWidth = coverHeight * RatioCoverWidthDivHeight 
    xRatio = coverWidth / width
    yRatio = coverHeight / height
  }

  const { x, y } = useMousePosition();

  useEffect(() => {
    if (typeof x === "number" && typeof y === "number") {
      set({ xy: calc(coverWidth - x, coverHeight - y, coverWidth, coverHeight) })
    }
  })

  return (
    <div className="HomeRoom" style={{
      width,
      height
    }}>
      <animated.div className="HomeRoom_background" style={{
        height: coverHeight,
        width: coverWidth,
        left: (width - coverWidth) / 2,
        top: (height - coverHeight) / 2,
        transform: props.xy.interpolate(trans1(xRatio, yRatio)),
        backgroundImage: `url(${background})`
      }} />
      <animated.div className="HomeRoom_card2" style={{ transform: props.xy.interpolate(trans2) }} />
    </div>
  )
}

export default HomeRoom
