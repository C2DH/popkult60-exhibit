import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useStory } from '@c2dh/react-miller'
import { useStore } from '../store'


const StaticPage = ({
  id, height = 0, width = 0,
  backgroundColor='var(--royal-blue-dark)',
  textClassName='text-white',
}) => {
  const { i18n } = useTranslation()
  const [story, { pending, error }] = useStory(id, {
    parser: 'yaml'
  }, {
    language: i18n.language.replace('-','_'),
  })
  console.info('Static', story)
  useEffect(() => {
    useStore.setState({
      backgroundColor,
      logoColor: '#95B1B5',
      logoActiveColor: '#f95421',
      color: 'var(--secondary)',
      activeColor: 'var(--accent)',
    });
  }, [backgroundColor])

  return (
    <Container style={{ marginTop:100, minHeight: height }}>
      <Row>
        <Col>
          <h1 className={textClassName}>{story?.data?.title}</h1>
          <p className={textClassName}>{story?.data?.subtitle}</p>
          error: {JSON.stringify(error)}
          pending: {JSON.stringify(pending)}
        </Col>
      </Row>
    </Container>
  )
}

export default StaticPage
