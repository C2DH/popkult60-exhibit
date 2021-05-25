import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useStore } from '../store'

const NotFound = ({ height }) => {
  const { t } = useTranslation()
  const {changeTheme} = useStore(state => state)
  useEffect(() => {
    changeTheme({
      name: 'themeHome',
    });
  }, [changeTheme])

  return (
    <Container className="NotFound" style={{ paddingTop: 200, minHeight: height - 200}}>
      <Row>
        <Col>
          <h1>{t('pagesNotFoundTitle')}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
