import React, {useEffect, useState} from 'react'
import { useTransition, animated } from 'react-spring'
import LangLink from './LangLink'
import '../styles/components/HomeThemesLoop.scss'

const HomeThemeItem = ({ style, theme, displayAuthors=false }) => {
  const authors = (theme?.authors || [])

  return (
    <animated.div className="HomeThemeItem" style={{ ...style }}>
      <><h1 className="text-center">
        <LangLink className="p-1 bg-white text-dark" to={`/story/${theme?.slug}`}>{theme?.data?.title || theme?.slug.split('-').join(' ')}
        </LangLink>
      </h1>
      <h2 className="text-center">
        <span className="p-1">{theme?.data?.abstract}</span>
      </h2>
      {displayAuthors ? authors.map((author, i) => (
        <div key={i} className="HomeThemeItem_author text-center mb-5">
          <span>{author.fullname}</span>
        </div>
      )): null}
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
    from: { transform: `translate3d(0,${activeStep.direction === 'down' ? '-50' : '100'}%,0)` },
    enter: { transform: `translate3d(0,0%,0)` },
    leave: { transform: `translate3d(0,${activeStep.direction === 'down' ? '100' : '-100'}%,0)` },
  })

  useEffect(() => {
    if (Array.isArray(themes) && themeSelected) {
      const idx = themes.findIndex(d => d.slug === themeSelected)
      if (idx !== -1 && idx !== activeStep.idx) {
        setActiveStep({ idx, direction: 'down' })
      }
    }
  }, [themes, themeSelected, activeStep])

  return (
    <div className="HomeThemesLoop position-relative" style={{
      height, width
    }}>
      <div className="HomeThemesLoop_wrapper position-absolute" style={{zIndex:10, width: width/2, height: height - 300, top: 150, left: width/4  }}>
        {transitions.map(({ item, props, key }) => {
          if (item > -1) {
            return <HomeThemeItem key={key} style={props} theme={themes[item]}/>
          }
          return (
            <animated.div className="HomeThemeItem" key={key} style={props}>
              <p  className="text-center font-weight-bold">
              <span className="bg-white p-2">
                To start, please pick one object in this room ...
              </span>
              </p>
            </animated.div>
          )
        })}

      </div>

    </div>
  )
}

export default HomeThemesLoop
