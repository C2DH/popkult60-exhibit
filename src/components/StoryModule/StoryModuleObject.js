import React from 'react'
import ObjectContent from '../ObjectContent'
import { Container, Row, Col} from 'react-bootstrap'
import { getModuleLayout } from '../../logic/layout'

const StoryModuleObject = ({ mod, documents, withMap=false, height=100, width }) => {
  // const layout = get(mod, "layout", "text-object")
  console.info('StoryModuleObject module:', mod, documents)
  const layout = getModuleLayout(mod)
  return (
    <div className="StoryModuleObject w-100 bg-dark" style={{ height }}>
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
