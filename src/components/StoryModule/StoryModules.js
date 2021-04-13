import React, { useEffect, useState } from 'react'
import StoryModule from './StoryModule'


const StoryModules = ({ width=0, height=0, storyModules=[], onChange }) => {
  const [scrollingSteps, setScrollingSteps] = useState({
    steps: [],
    current: null,
  })
  const handleScroll = () => {
    if (scrollingSteps.steps.length) {
      const maxProgress = {
        idx: -1,
        p: 0,
      }
      const steps = scrollingSteps.steps.map((d, i) => {
        const inViewport = (
          d.top + d.height > window.scrollY &&
          d.top < window.scrollY + height
        )
        const progress = inViewport
          ? Math.min(1.0, (height - Math.abs(d.top - window.scrollY)) / d.height)
          : d.top >= window.scrollY + height
            ? 0.0
            : -1.0
        if (progress > maxProgress.p) {
          maxProgress.idx = i
          maxProgress.p = progress
        }
        return {
          ...d,
          inViewport,
          progress,
        }
      })
      // did it change?
      if(scrollingSteps.current !== maxProgress.idx) {
        onChange({
          idx: maxProgress.idx
        })
      }
      setScrollingSteps({ steps, current: maxProgress.idx })
      // console.log('@handleScroll', maxProgress);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // after resize, register the offset top of every storyModule
  useEffect(() => {
    console.info('Story HEIGHT and width changed', width, height, window.scrollY)
    if (storyModules && storyModules.length) {
      const myNodeList = document.getElementsByClassName('StoryModule')
      const steps = []
      for (let i = 0; i < myNodeList.length; i++) {
        let rect = myNodeList[i].getBoundingClientRect();
        steps.push({
          top: rect.top + window.scrollY,
          height: rect.height,
        })
      }
      // reset our reference.
      setScrollingSteps({steps})
    }
  }, [width, height, storyModules])

  return (
    <>
      {storyModules.map((d, i) => {
        let stepProgress = 0.0
        let stepInViewport = false
        if (scrollingSteps.steps.length && scrollingSteps.steps[i]) {
          stepProgress = scrollingSteps.steps[i].progress
          stepInViewport = scrollingSteps.steps[i].inViewport
        }
        return (
          <StoryModule key={i} mod={d} height={height} progress={stepProgress} inViewport={stepInViewport}/>
        )
      })}
    </>
  )
}

export default StoryModules
