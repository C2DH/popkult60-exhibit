import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
//
// const DocumentViewerPdf = lazy(() => import('./DocumentViewerPdf'))
// const DocumentViewerImage = lazy(() => import('./DocumentViewerImage'))
// const DocumentViewerVideo = lazy(() => import('./DocumentViewerVideo'))
// const AvailableComponents = {
//   'pdf': DocumentViewerPdf,
//   'image': DocumentViewerImage,
//   'video': DocumentViewerVideo,
// }


const StoryModule = ({
  mod = {},
  height = 0,
  inViewport = false,
  progress=0.0,
  debug = false
}) => {
  return (
    <div className="StoryModule my-5 d-flex align-items-center " style={{
      minHeight: height*.75
    }}>
      <Container >
        <Row>
          <Col md={{span:6}} >
            {debug
              ? (
                <>
                  <b>{inViewport ? 'visible':'invisible'}</b> {progress}<br/>
                </>
              )
              : null
            }
            <div className="bg-white p-5">{mod?.text?.content}</div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default React.memo(StoryModule)
