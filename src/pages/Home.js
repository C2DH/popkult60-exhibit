import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{t('pagesHomeTitle')}</h1>
          <p>{t('pagesHomeSubheading')} {t('asNumber', {n: 15040.32456})}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
