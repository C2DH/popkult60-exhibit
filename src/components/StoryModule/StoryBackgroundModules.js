import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { useTransition, animated } from 'react-spring'
import {isBackgroundModuleNeeded} from '../../logic/layout'


const StoryBackgroundModule = ({ mod, storyDocuments, style }) => {
  const documentsIndex = storyDocuments.reduce((acc, d) => {
    acc[d.document_id] = d
    return acc
  }, {})
  if (!mod.object || !mod.object.id) {
    return null
  }
  const backgroundCoverImage = get(documentsIndex[mod.object.id], 'data.resolutions.preview.url')
  const backgroundCoverImageCaption = get(documentsIndex[mod.object.id], 'data.title', '')
  return (
    <animated.div className="StoryBackgroundModule" style={{
      ...style,
      position: 'absolute',
      top: 0,
      left: '50%',
      right: 50,
      bottom: 0,
      paddingTop: 100,
      paddingLeft: 100,
      paddingBottom: 150,
    }}>
    <div className="w-100 h-100" style={{
      backgroundImage: `url(${backgroundCoverImage})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundColor: 'var(--dark)',
    }} />
      <figcaption className="position-absolute" style={{
        left: 100,
        right: 100,
      }}>
      { backgroundCoverImageCaption }
      </figcaption>
    </animated.div>
  )
}
const StoryBackgroundModules = ({ storyModules = [], currentModule = -1, storyDocuments=[] }) => {
  const [activeStep, setActiveStep] = useState(() => ({
    isValid: isBackgroundModuleNeeded(storyModules[currentModule]),
    idx: currentModule,
    direction: 'down'
  }))

  useEffect(() => {
    const updatedIsActive = isBackgroundModuleNeeded(storyModules[currentModule])
    if (currentModule !== -1 && currentModule !== activeStep.idx) {
      setActiveStep({
        isActive: updatedIsActive,
        idx: currentModule,
        direction: currentModule > activeStep.idx ? 'up' : 'down'
      })
    }
  }, [storyModules, currentModule, activeStep])

  const transitions = useTransition(activeStep.idx, p => p, {
    from: { transform: `translate3d(0,${activeStep.direction === 'down' ? '-100' : '100'}%,0)` },
    enter: { transform: `translate3d(0,0%,0)` },
    leave: { transform: `translate3d(0,${activeStep.direction === 'down' ? '100' : '-100'}%,0)` },
  })

  return (
    <div className="StoryBackgroundModules w-100 h-100" style={{
      backgroundColor: activeStep.isValid ? 'var(--accent)' : 'transparent'
    }}>
      {transitions.map(({ item, props, key }) => {
        if (item > -1 && isBackgroundModuleNeeded(storyModules[item])) {
          return (
            <StoryBackgroundModule key={key} style={props}
              mod={storyModules[item]} storyDocuments={storyDocuments}
              />
          )
        }
        return <div key={key}></div>
      })}
    </div>
  )
}

export default StoryBackgroundModules
