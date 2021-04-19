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
import {
  ThemeTv, ThemePoster, ThemeMagTv, ThemeRetro, ThemePlatine, ThemeRadio, ThemeMagPilote
} from '../constants'
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


const HomeRoom = ({ width, height, margin=20, themeSelected, onThemeChanged }) => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 1, tension: 50, friction: 10 } }))
  const [selected, setSelected] = useState(themeSelected)
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

  const mouseEnterHandler = (selectedId) => {
    setSelected(selectedId)
    onThemeChanged(selectedId)
  }

  useEffect(() => {
    if (typeof x === "number" && typeof y === "number") {
      set({ xy: calc(coverWidth - x, coverHeight - y, coverWidth, coverHeight) })
    }
  })

  useEffect(() => {
    if(themeSelected !== selected) {
      console.info('themeSelected changed to:', themeSelected)
      setSelected(themeSelected)
    }
  }, [themeSelected, selected])


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
        <LangLink to={`story/${ThemePoster.slug}`} className="HomeRoom_item" style={{
          width: '12%',
          top: '30%',
          left: '5%',
        }} onMouseEnter={() => mouseEnterHandler(ThemePoster.slug)} onMouseLeave={() => setSelected(null)}>
          <MagicObjectPoster highlight={selected === ThemePoster.slug} />
        </LangLink>

        <LangLink to={`story/${ThemeTv.slug}`} className="HomeRoom_item" style={{
          width: '13%',
          top: '46%',
          left: '42%',
        }} onMouseEnter={() => mouseEnterHandler(ThemeTv.slug)} onMouseLeave={() => setSelected(null)}>
          <MagicObjectTv highlight={selected === ThemeTv.slug} />
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
        <LangLink to={`story/${ThemePlatine.slug}`} className="HomeRoom_item" style={{
          width: '8%',
          top: '54%',
          left: '10%',
        }} onMouseEnter={() => mouseEnterHandler(ThemePlatine.slug)} onMouseLeave={() => setSelected(null)}>
          <MagicObjectPlatine highlight={selected === ThemePlatine.slug} />
        </LangLink>

        <LangLink to={`story/${ThemeRadio.slug}`} className="HomeRoom_item" style={{
          width: '8%',
          top: '31%',
          left: '85%',
        }} onMouseEnter={() => mouseEnterHandler(ThemeRadio.slug)} onMouseLeave={() => setSelected(null)}>
          <MagicObjectRadio highlight={selected === ThemeRadio.slug} />
        </LangLink>
        <LangLink to={`story/${ThemeRetro.slug}`} className="HomeRoom_item" style={{
          width: '9%',
          top: '43%',
          left: '20%',
        }} onMouseEnter={() => mouseEnterHandler(ThemeRetro.slug)} onMouseLeave={() => setSelected(null)}>
          <MagicObjectRetro highlight={selected === ThemeRetro.slug} />
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
        <LangLink to={`story/${ThemeMagTv.slug}`} className="HomeRoom_item" style={{
          width: '14%',
          top: '64%',
          left: '41%',
        }} onMouseEnter={() => mouseEnterHandler(ThemeMagTv.slug)} onMouseLeave={() => setSelected(null)}>
          <MagicObjectMag highlight={selected === ThemeMagTv.slug} version='magTv' />
        </LangLink>

        <LangLink to={`story/${ThemeMagPilote.slug}`} className="HomeRoom_item" style={{
          width: '14%',
          top: '64%',
          left: '50%',
        }} onMouseEnter={() => mouseEnterHandler(ThemeMagPilote.slug)} onMouseLeave={() => setSelected(null)}>
          <MagicObjectMag highlight={selected === ThemeMagPilote.slug} version='magPilote' />
        </LangLink>

      </animated.div>
    </div>
  )
}

export default HomeRoom
