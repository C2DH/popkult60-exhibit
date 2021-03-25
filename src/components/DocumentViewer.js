import React, { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col } from 'react-bootstrap'
import DocumentViewerMetadata from './DocumentViewerMetadata'
import '../styles/components/DocumentViewer.scss'

const DocumentViewerPdf = lazy(() => import('./DocumentViewerPdf'))
const DocumentViewerImage = lazy(() => import('./DocumentViewerImage'))

const AvailableComponents = {
  'pdf': DocumentViewerPdf,
  'image': DocumentViewerImage
}

const DocumentViewer = ({ doc = {}, width, height }) => {
  const { t } = useTranslation()
  const DocumentViewerComponent = AvailableComponents[doc.type]

  if(!DocumentViewerComponent) {
    return (<div>{doc.type}</div>)
  }
  return(
    <div className="DocumentViewer">
      <DocumentViewerComponent doc={doc} height={height * .8} />
      <Container>
        <Row>
          <Col>
            <div className="badge badge-primary-outline">{doc.data.type}</div>
            <h2>{doc.title}</h2>
          </Col>
        </Row>
        <Row className="border-top border-dark">
          <Col>
            <label className="mb-0"><small>{t('documentDescription')}</small></label><p>
            {doc.data.description || 'n.a'}
            </p>
          </Col>
          <Col>
          <div className="border-left border-dark pl-3">
            <DocumentViewerMetadata doc={doc}/>
            </div>
          </Col>
        </Row>
        <Row>
        </Row>
      </Container>
    </div>
  )
}

export default DocumentViewer
