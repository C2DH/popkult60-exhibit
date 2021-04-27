import React, { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col } from 'react-bootstrap'
import DocumentViewerMetadata from './DocumentViewerMetadata'
import DocumentViewerRelatedStories from './DocumentViewerRelatedStories'

import '../../styles/components/DocumentViewer.scss'

const DocumentViewerPdf = lazy(() => import('./DocumentViewerPdf'))
const DocumentViewerImage = lazy(() => import('./DocumentViewerImage'))
const DocumentViewerVideo = lazy(() => import('./DocumentViewerVideo'))
const AvailableComponents = {
  'pdf': DocumentViewerPdf,
  'image': DocumentViewerImage,
  'video': DocumentViewerVideo,
}

const DocumentViewer = ({ doc = {}, width, height }) => {
  const { t } = useTranslation()
  const DocumentViewerComponent = AvailableComponents[doc.type]

  if(!DocumentViewerComponent) {
    return (<div style={{height: height * .8}}>{doc.type}</div>)
  }
  return(
    <div className="DocumentViewer">
      <DocumentViewerComponent doc={doc} height={height * .8} />
      <div className="border-top border-white" style={{
        paddingBottom: height * 0.2
      }}>
        <Container className="border-bottom border-white">
          <Row>
            <Col>
              <div className="badge badge-primary-outline">{doc.data.type}</div>
              <h2 className="text-smaller">{doc.title}</h2>
            </Col>
          </Row>
          <Row className="border-top border-white mt-2">
            <Col>
              <label className="mb-0"><small>{t('documentDescription')}</small></label><p>
              {typeof(doc.data.description) === 'string' || 'n.a'}
              </p>
              <DocumentViewerRelatedStories doc={doc}/>
            </Col>
            <Col>
              <div className="border-left border-white pl-3 h-100">
                <DocumentViewerMetadata doc={doc}/>
              </div>
            </Col>
          </Row>
          <Row className="mt-2 mb-2">
            <Col>

            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default DocumentViewer
