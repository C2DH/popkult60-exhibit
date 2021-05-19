import React from 'react'
import ObjectContent from '../ObjectContent'
// import { Container, Row, Col} from 'react-bootstrap'
// import { getModuleLayout } from '../../logic/layout'

const StoryModuleObject = ({ mod, documents, withMap=false, height=100, width }) => {
  // const layout = get(mod, "layout", "text-object")
  // const layout = getModuleLayout(mod)
  // console.info('StoryModuleObject module:', mod, documents)
  //
  return (
    <div className="StoryModuleObject w-100" style={{ minHeght: height }}>
    {documents.map((d, i) => (
      <ObjectContent key={i} document={d}
        objectConfig={mod}
        availableHeight={height}
        availableWidth={width}
      />
    ))}
    </div>
  )
}

export default StoryModuleObject
