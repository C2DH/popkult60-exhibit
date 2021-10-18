import React from 'react'
import Logo from './Logo'
// import { Button } from 'react-bootstrap'
import { useSpring, animated } from 'react-spring'

const transform = (y) => `translate(0px,${y}px)`
const HeaderMobile = ({ width, height }) => {
  const [props, set] = useSpring(() => ({ y: -50, config: { mass: 1, tension: 50, friction: 10 } }))

  set({ y: 0 })



  return (
    <>
    <animated.header style={{
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      width,
      height:50,
      transform: props.y.interpolate(transform),
    }}>
      <Logo logoReduced offsetTop={5} offsetLeft={(width - 281.25) / 2}/>
    </animated.header>

    </>
  )
}

export default HeaderMobile
