import React, {useEffect, useState} from 'react'
import { useTransition, animated } from 'react-spring'

import '../styles/components/HomeThemesLoop.scss'

const HomeThemeItem = ({ style, theme }) => {
  return (
    <animated.div className="HomeThemeItem" style={{ ...style }}>
      <><h1 className="text-center">
        <span className="bg-white p-1">{theme?.data?.title || theme?.slug.split('-').join(' ')}
        </span>

      </h1>
      <h2><span className="bg-accent text-white p-1">{theme?.data?.abstract}
      </span></h2>
      </>
    </animated.div>
  )
}

const HomeThemesLoop = ({ themes=[], height=0, width=0, stepHeight=0, themeSelected, onThemeChanged}) => {
  const [activeStep, setActiveStep] = useState({
    direction: 'down',
    idx: -1
  })

  const transitions = useTransition(activeStep.idx, p => p, {
    from: { opacity: 0, transform: `translate3d(0,${activeStep.direction === 'down' ? '-50' : '100'}%,0)` },
    enter: { opacity: 1, transform: `translate3d(0,0%,0)` },
    leave: { opacity: 0, transform: `translate3d(0,${activeStep.direction === 'down' ? '100' : '-50'}%,0)` },
  })

  useEffect(() => {
    if (Array.isArray(themes) && themeSelected) {
      const idx = themes.findIndex(d => d.slug === themeSelected)
      if (idx !== -1 && idx !== activeStep.idx) {
        setActiveStep({ idx, direction: idx < activeStep.idx ? 'up' : 'down' })
      }
    }
  }, [themes, themeSelected, activeStep])

  return (
    <div className="HomeThemesLoop position-relative" style={{
      height, width
    }}>
      <div className="position-absolute" style={{zIndex:10, border: '1px solid red', width: width/2, height: height/2, top: (height - width/2) / 2, left: width/4}}>
        {transitions.map(({ item, props, key }) => {
          if (item > -1) {
            return <HomeThemeItem key={key} style={props} theme={themes[item]}/>
          }
          return (
            <p key={key} className="text-center font-weight-bold">
              <span className="bg-white p-2">
                To start, please pick one object in this room ...
              </span>
            </p>
          )
        })}
        <div className="position-absolute" style={{
          bottom: -(height - width/2) / 4
        }}>
          Abstract and author and tag
        </div>
      </div>

    </div>
  )
}

export default HomeThemesLoop
