import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import {useMousePosition} from '../hooks'
import '../styles/components/HomeRoom.scss'
import MagicObjectRadio from './MagicObject/MagicObjectRadio'
import MagicObjectPlatine from './MagicObject/MagicObjectPlatine'
import MagicObjectPoster from './MagicObject/MagicObjectPoster'
import MagicObjectTv from './MagicObject/MagicObjectTv'
import MagicObjectRetro from './MagicObject/MagicObjectRetro'
import MagicObjectMag from './MagicObject/MagicObjectMag'

import LangLink from './LangLink'
// import background from "../assets/images/room_background.png"
import roomBackground from "../assets/images/room_background.svg"
import roomLightEffect from "../assets/images/room_light_effect.svg"
import roomFurniture from "../assets/images/room_furniture.svg"
import roomFurnitureForeground from "../assets/images/room_furniture_foreground.svg"
// import itemPlatine from '../assets/images/platine_2.svg'
// import itemMag from '../assets/images/mag_2.svg'

const CoeffCover = 3
const CoeffContain = 6
const calc = (x, y, w, h) => [x - w / 2, y - h / 2]
const trans1 = (xRatio, yRatio, coeff=CoeffContain) => (x, y) => `translate3d(${x * xRatio / coeff}px,${y * yRatio / coeff}px,0)`
const RatioCoverWidthDivHeight = 1 // 1104/618
const RatioCoverHeightDivWidth = 1 // 618/1104


const HomeRoom = ({ width, height, margin=20 }) => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 1, tension: 50, friction: 10 } }))
  const [selected, setSelected] = useState()
  let coeff = CoeffCover;
  let coverHeight = 1000// 618;
  let coverWidth = 1000// 1104;
  // contained
  if (coeff === CoeffContain) {
    if (width > height) {
      coverWidth = Math.min(height * RatioCoverWidthDivHeight, width)
      coverHeight = RatioCoverHeightDivWidth * coverWidth
    }
  }
  //
  // cover
  if (coeff === CoeffCover) {
    if (width > height) {
      coverWidth = width
      coverHeight = coverWidth * RatioCoverHeightDivWidth
    }
  }
  // old
  // if (width > height) {
  //   coverHeight = height * RatioTrans
  //   coverWidth = coverHeight * RatioCoverWidthDivHeight
  //   xRatio = coverWidth / width
  //   yRatio = coverHeight / height
  // } else {
  //   coverHeight = height
  //   coverWidth = coverHeight * RatioCoverWidthDivHeight
  //   xRatio = coverWidth / width
  //   yRatio = coverHeight / height
  // }

  const { x, y } = useMousePosition();

  useEffect(() => {
    if (typeof x === "number" && typeof y === "number") {
      set({ xy: calc(coverWidth - x, coverHeight - y, coverWidth, coverHeight) })
    }
  })

  const mouseEnterHandler = (selectedId) => {
    setSelected(selectedId)
  }

  return (
    <div className="HomeRoom" style={{
      width,
      height,
    }}>
      <animated.div className="HomeRoom_background" style={{
        height: coverHeight,
        width: coverWidth,
        left: (width - coverWidth) / 2,
        top: (height - coverHeight) / 2,
        transform: props.xy.interpolate(trans1(.1, .1, coeff)),
        backgroundImage: `url(${roomBackground})`,
      }} />
      <animated.div className="HomeRoom_background" style={{
        height: coverHeight,
        width: coverWidth,
        left: (width - coverWidth) / 2,
        top: (height - coverHeight) / 2,
        transform: props.xy.interpolate(trans1(.12, .12, coeff)),
        backgroundImage: `url(${roomLightEffect})`,
      }} />
      <animated.div className="HomeRoom_background" style={{
        height: coverHeight,
        width: coverWidth,
        left: (width - coverWidth) / 2,
        top: (height - coverHeight) / 2,
        transform: props.xy.interpolate(trans1(.15, .15, coeff)),
      }}>
        <LangLink to="/story/le-deserteur-de-boris-vian" className="HomeRoom_item" style={{
          width: '12%',
          top: '30%',
          left: '5%',
        }} onMouseEnter={() => mouseEnterHandler('poster')} onMouseLeave={() => setSelected(null)}>
          <MagicObjectPoster highlight={selected === 'poster'} />
        </LangLink>

        <LangLink to="/story/le-deserteur-de-boris-vian" className="HomeRoom_item" style={{
          width: '13%',
          top: '46%',
          left: '42%',
        }} onMouseEnter={() => mouseEnterHandler('tv')} onMouseLeave={() => setSelected(null)}>
          <MagicObjectTv highlight={selected === 'tv'} />
        </LangLink>
      </animated.div>
      <animated.div className="HomeRoom_background" style={{
        height: coverHeight,
        width: coverWidth,
        left: (width - coverWidth) / 2,
        top: (height - coverHeight) / 2,
        transform: props.xy.interpolate(trans1(.25, .25, coeff)),
        backgroundImage: `url(${roomFurniture})`
      }}>
        <LangLink to="/story/le-deserteur-de-boris-vian" className="HomeRoom_item" style={{
          width: '8%',
          top: '54%',
          left: '10%',
        }} onMouseEnter={() => mouseEnterHandler('platine')} onMouseLeave={() => setSelected(null)}>
          <MagicObjectPlatine highlight={selected === 'platine'} />
        </LangLink>
        <div className="HomeRoom_item" style={{
          width: '8%',
          top: '31%',
          left: '85%',
        }} onMouseEnter={() => mouseEnterHandler('radio')} onMouseLeave={() => setSelected(null)}>
          <MagicObjectRadio highlight={selected === 'radio'} />
        </div>
        <LangLink to="/story/le-deserteur-de-boris-vian" className="HomeRoom_item" style={{
          width: '9%',
          top: '43%',
          left: '20%',
        }} onMouseEnter={() => mouseEnterHandler('retro')} onMouseLeave={() => setSelected(null)}>
          <MagicObjectRetro highlight={selected === 'retro'} />
        </LangLink>
      </animated.div>
      <animated.div className="HomeRoom_background" style={{
        height: coverHeight,
        width: coverWidth,
        left: (width - coverWidth) / 2,
        top: (height - coverHeight) / 2,
        transform: props.xy.interpolate(trans1(.5, .5, coeff)),
        backgroundImage: `url(${roomFurnitureForeground})`
      }}>
        <LangLink to="/story/le-deserteur-de-boris-vian" className="HomeRoom_item" style={{
          width: '14%',
          top: '64%',
          left: '41%',
        }} onMouseEnter={() => mouseEnterHandler('magTv')} onMouseLeave={() => setSelected(null)}>
          <MagicObjectMag highlight={selected === 'magTv'} version='magTv' />
        </LangLink>

        <LangLink to="/story/le-deserteur-de-boris-vian" className="HomeRoom_item" style={{
          width: '14%',
          top: '64%',
          left: '50%',
        }} onMouseEnter={() => mouseEnterHandler('magPilote')} onMouseLeave={() => setSelected(null)}>
          <MagicObjectMag highlight={selected === 'magPilote'} version='magPilote' />
        </LangLink>

      </animated.div>
    </div>
  )
}

export default HomeRoom
