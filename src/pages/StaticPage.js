import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useStory } from '@c2dh/react-miller'
import { useStore } from '../store'

import Markdown from 'markdown-to-jsx'

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

  if (error) {
    console.warn(error);
  }
  return (
    <Container style={{ marginTop: 200, minHeight: height }}>
      <Row>
        <Col>
          <h1 className={textClassName}>{story?.data?.title}</h1>
          <p className={textClassName + ' my-5'}>{story?.data?.subtitle}</p>
        </Col>
      </Row>
      <Row>
        <Col xl={{span: 6}} lg={{span: 8}} className="text-white">
          {story?.data?.abstract
            ? (
              <Markdown
                children={story?.data?.abstract}
                options={{
                  forceBlock: true
                }}/>
              )
            : null
          }
        </Col>
      </Row>
    </Container>
  )
}

export default StaticPage
