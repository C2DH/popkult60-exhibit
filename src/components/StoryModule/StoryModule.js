import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import StoryModuleNotImplemented from './StoryModuleNotImplemented'

import StoryModuleTextObject from './StoryModuleTextObject'
import StoryModuleText from './StoryModuleText'
import StoryModuleTextGallery from './StoryModuleTextGallery'
//
// const DocumentViewerPdf = lazy(() => import('./DocumentViewerPdf'))
// const DocumentViewerImage = lazy(() => import('./DocumentViewerImage'))
// const DocumentViewerVideo = lazy(() => import('./DocumentViewerVideo'))
// const AvailableComponents = {
//   'pdf': DocumentViewerPdf,
//   'image': DocumentViewerImage,
//   'video': DocumentViewerVideo,
// }
import '../../styles/components/StoryModule.scss'


const StoryModule = ({
  mod = {},
  height = 0,
  inViewport = false,
  progress=0.0,
  debug = false,
  storyDocuments=[]
}) => {
  // console.info('StoryModule', mod, storyDocuments)
  const documentsIndex = storyDocuments.reduce((acc, d) => {
    acc[d.document_id] = d
    return acc
  }, {})

  let documents = []
  let StoryModuleComponent = StoryModuleNotImplemented

  if (mod.module === 'text_object') {
    StoryModuleComponent = StoryModuleTextObject
    documents = [documentsIndex[mod.object.id]]
  } else if (mod.module === 'text') {
    StoryModuleComponent = StoryModuleText
  } else if (mod.module === 'text_gallery') {
    StoryModuleComponent = StoryModuleTextGallery
    documents = mod.gallery.objects.map(d => documentsIndex[d.id])
  }

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
            <StoryModuleComponent mod={mod} documents={documents}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default React.memo(StoryModule)
