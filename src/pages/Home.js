import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useCurrentWindowDimensions } from '../hooks'
import HomeRoom from '../components/HomeRoom'
import HomeThemes from '../components/HomeThemes'


const Home = () => {
  const { t } = useTranslation()
  const { width, height } = useCurrentWindowDimensions()

  return (
    <div className="Home">
    <HomeRoom width={width} height={height} />
    <Container fluid>
      <Row>
        <Col>
          <p>{t('pagesHomeSubheading')} {t('asNumber', {n: 15040.32456})}</p>
        </Col>
      </Row>
    </Container>
    <HomeThemes width={width} height={height} stepHeight={height/2} themes={[ 0, 1, 2, 3, 4 ]}/>
    </div>
  )
}

export default Home
