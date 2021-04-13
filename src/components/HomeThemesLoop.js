import React, {useEffect, useState} from 'react'

const VoidFunction = () => {
  console.warn('empty trigger')
}


const HomeThemesLoop = ({ themes=[], height=0, width=0, stepHeight=0, onThemeChanged=VoidFunction}) => {
  const [position, setPosition] = useState({ x:0, y: 0, yCycle: 0})
  const themeHeight = height / 2
  const themesHeight = themes.length * themeHeight
  useEffect(() => {
    const handleWheel = (e) => {
      const yCycle = (position.y + e.deltaY) % themesHeight

      console.info('@onWheel', yCycle)
      // current thems higllighted
      // position.y + e.deltaY
      //
      setPosition({
        x: position.x + e.deltaX,
        y: position.y + e.deltaY,
        yCycle,
      })
    }
    window.addEventListener('wheel', handleWheel);
    // cleanup this component
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [position.x, position.y, themesHeight]);
  return (
    <div className="HomeThemesLoop position-relative" style={{
      height, width
    }}>
      <div className="position-absolute h-100 w-100" style={{ overflow: 'scroll'}}>
        {themes.map((d,i) => {
          return (
            <div key={i} style={{
              position: 'absolute',
              zIndex: 100,
              top: i * themeHeight,
              width,
              height: height/2,
              // border: '1px solid black',
              transform: `translate3d(0, ${-position.yCycle}px, 0)`
            }}>
              <div className="d-flex align-items-center justify-content-center h-100 w-100">
                <h2 className="display-4">{d.data.title}</h2>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeThemesLoop
