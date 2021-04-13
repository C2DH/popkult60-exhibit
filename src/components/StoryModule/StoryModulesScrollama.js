import React, { useState } from 'react'
import { Scrollama, Step } from 'react-scrollama'
import StoryModule from './StoryModule'


const StoryModules = ({ width=0, height=0, storyModules=[], onChanged }) => {
  const [currentStep, setCurrentStep] = useState({
    idx: -1,
    direction: 'down'
  })
  const onStepEnter = ({data, direction}) => {
    setCurrentStep({
      idx: data,
      direction,
    })
  }

  return (
    <div className="StoryModules" style={{ minHeight: height, marginTop: height/2 }}>
      <Scrollama
          onStepEnter={onStepEnter}
          offset={.5}
          debug
        >
        {storyModules.map((d, i) => (
          <Step data={i} key={i}>
            <div style={{ minHeight: height/2 }}>
              step: {i}, {currentStep.idx}
              <StoryModule
                mod={d}
                height={height}
                inViewport={i===currentStep.idx}
              />
            </div>
          </Step>
        ))}
      </Scrollama>
    </div>
  )
}

export default StoryModules
