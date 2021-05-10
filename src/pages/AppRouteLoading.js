import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const AppRouteLoading = () => {
  const { t } = useTranslation()
  
  return (
    <Container className="AppRouteLoading h-100 text-center">
      <Row className="h-100 d-flex align-items-center">
        <Col>
          <h1 className="my-5">{t('pagesAppRouteLoadingTitle')}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default AppRouteLoading
