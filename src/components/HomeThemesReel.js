import React, {useEffect} from 'react'
import { useSpring, animated } from 'react-spring'

const transition = (x) => `translate3d(${x}px, 0px, 0px)`

const ThemesReel = ({ themes=[], currentThemeIdx=0, width=0, height=0 }) => {
  const [{ x }, set] = useSpring(() => ({ x: - currentThemeIdx * width }));

  useEffect(() => {
    set({ x: - currentThemeIdx * width})
  })

  return (
    <animated.div className="ThemesReel" style={{
      position: 'fixed', top: 0, bottom: 0,
      transform: x.interpolate(transition)
    }}>
      {themes.map((d, i) => (
        <div className={`ThemesReel_theme position-absolute ${currentThemeIdx === i ? 'active' : ''}`} key={i}
          style={{
            top: 0,
            bottom: 0,
            left: width * i,
            width: width,
          }}
        >
          <div className="d-flex h-100 align-items-center justify-content-center">
            {JSON.stringify(d)}
            <h2>The forgotten song</h2>
          </div>
        </div>
      ))}
    </animated.div>
  )
}

export default ThemesReel
