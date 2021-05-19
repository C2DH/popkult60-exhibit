import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <Container style={{ marginTop: 200 }}>
      <Row>
        <Col>
          <h1>{t('pagesNotFoundTitle')}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
