import React, {useState} from 'react'
import { Scrollama, Step } from 'react-scrollama'
import HomeThemesReel from './HomeThemesReel'


const VoidFunction = () => {
  console.warn('empty trigger')
}

const HomeThemes = ({ themes=[], height=0, width=0, stepHeight=0, onThemeChanged=VoidFunction}) => {
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
    <div className="HomeThemes" style={{ marginTop: stepHeight }}>
      <HomeThemesReel
        width={width*2/3}
        themes={themes}
        currentThemeIdx={currentStep.idx}
        direction={currentStep.direction}
      />
      <Scrollama
          onStepEnter={onStepEnter}
          offset={.5}
          threshold={0}
        >
        {themes.map((d, i) => (
          <Step data={i} key={i}>
            <div style={{ height: stepHeight }}>
            </div>
          </Step>
        ))}
      </Scrollama>
    </div>
  )
}

export default HomeThemes
