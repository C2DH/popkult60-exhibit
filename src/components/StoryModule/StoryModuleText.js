import React from 'react'
import TextContent from '../TextContent'
import { Container, Row, Col} from 'react-bootstrap'
import { getModuleLayout } from '../../logic/layout'

const ModuleText = ({ mod, backgroundStyles, withMap=false }) => {
  // const layout = get(mod, "layout", "text-object")
  // console.info('ModuleText module:', mod)
  const layout = getModuleLayout(mod)
  return (
    <Container className="StoryModuleText">
      <Row>
        <Col className="p-5" {...layout.cols[0]}>
          <TextContent textConfig={mod.text} />
        </Col>
      </Row>
    </Container>
  )
}

export default ModuleText
