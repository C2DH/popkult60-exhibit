import React, { useEffect, useState } from 'react'
import StoryModule from './StoryModule'
// import StoryBackgroundModules from './StoryBackgroundModules'

const StoryModules = ({ width=0, height=0, storyModules=[], storyDocuments=[], onChange, withMap=false }) => {
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
        window.history.pushState({}, null, `#p${maxProgress.idx + 1}`)
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
      console.info('LODADED')


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

      // let timer = setTimeout(() => {
      //   const id = window.location.hash.replace('#', '');
      //   if (id.length && !withMap) {
      //     // go to anchor
      //     const element = document.getElementById(id);
      //     console.info('ScrollToTop: reaching id =', id);
      //     if (element) {
      //       // element.scrollIntoView();
      //       window.scrollTo(0, element.offsetTop)
      //     }
      //   }
      // }, 100)
      //
      // return () => {
      //   clearTimeout(timer)
      // }
    }
  }, [width, height, storyModules, withMap])

  return (
    <>
    <div style={{
      marginTop: withMap ? window.innerHeight / 4 : 100,
    }}>
      {storyModules.map((d, i) => {
        let stepProgress = 0.0
        // let stepInViewport = false
        if (scrollingSteps.steps.length && scrollingSteps.steps[i]) {
          stepProgress = scrollingSteps.steps[i].progress
          // stepInViewport = scrollingSteps.steps[i].inViewport
        }
        return (
          <React.Fragment key={i}>
            <div className="anchor" id={`p${i+1}`}></div>
            <StoryModule num={i+1} key={i} mod={d} width={width} height={height} progress={scrollingSteps.current === i ? stepProgress : 0} inViewport={scrollingSteps.current === i} storyDocuments={storyDocuments} withMap={withMap}/>
          </React.Fragment>
        )
      })}
    </div>
    </>
  )
}

export default StoryModules
