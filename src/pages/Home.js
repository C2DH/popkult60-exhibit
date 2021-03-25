import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useCurrentWindowDimensions } from '../hooks'
import HomeRoom from '../components/HomeRoom'
import HomeThemes from '../components/HomeThemes'
import { useStore } from '../store'
import { useCachedStories } from 'react-miller'


let c = 0

const Home = () => {
  const { t, i18n } = useTranslation()
  const { width, height } = useCurrentWindowDimensions()
  const [stories, pagination, { error }] = useCachedStories({
    filters: {tags__slug: 'theme' }
  }, {
    language: i18n.language.split('-').join('_'),
    defaultLanguage: i18n.options.defaultLocale,
  })
  useEffect(() => {
    useStore.setState({
      backgroundColor: 'transparent',
      logoReduced: false 
    });
  }, [])
  c = c+1
  if(c > 10) {
   throw new Error('stop')
  }
  console.info("Home", stories, pagination, error)
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
