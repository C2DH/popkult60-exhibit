import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TextContent from '../TextContent'
import ObjectContent from '../ObjectContent'
import { useBoundingClientRect } from '../../hooks'
import { getModuleLayout } from '../../logic/layout'

const StoryModuleTextObject = ({ mod, documents, backgroundStyles, withMap=false, num }) => {
  const [{ left, width }, ref] = useBoundingClientRect({ accurate: true})
  const layout = getModuleLayout(mod, withMap)
  return (
    <div ref={ref} className={`StoryModuleTextObject ${withMap ? 'w-50' : 'w-100'}`}>
      <Container>
        <Row>
          <Col className="mb-5 position-relative" {...layout.cols[0]}>
            <div className="StoryModule_num">{num}</div>
            <TextContent textConfig={mod.text} />
          </Col>
          <Col {...layout.cols[1]}>
            {documents.map((d, i) => (
              <ObjectContent key={i} document={d} objectConfig={mod.object}
                availableHeight={window.innerHeight * .75}
                availableWidth={withMap ? width + left - 20 : width/2 - 20}
                style={{
                  marginLeft: -left,
                }}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StoryModuleTextObject
