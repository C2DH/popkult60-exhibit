import React, { useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MiniDocument from './MiniDocument'
import LangLink from './LangLink'
import groupBy from 'lodash/groupBy'
import { useTranslation } from 'react-i18next'
import { getTranslatableTypeFromMetadata } from '../logic/metadata'

const DocumentsGrid = ({
  documents = [],
  ascending = true,
  groupKey = 'data.year'
}) => {
  const { t } = useTranslation()
  const { documentsGroups, keys } = useMemo(() => {
    const documentsGroups = groupBy(documents, groupKey)
    let keys = Object.keys(documentsGroups).sort()
    if (!ascending) {
      keys.reverse()
    }
    console.info('updated keys', keys)
    return { documentsGroups, keys}
  }, [documents, ascending, groupKey])

  return keys.map((k) => (
    <Container key={k}>
      {k !== "undefined" && (
        <Row>
          <Col>{
            groupKey === 'data.type'
              ? t(getTranslatableTypeFromMetadata({ type: k }))
              : k
          }</Col>
        </Row>
      )}
      <Row>
        <Col>
          <div style={{
            display: 'grid',
            justifyContent: 'space-between',
            gridTemplateColumns: 'repeat(auto-fill,68px)',
            gridTemplateRows: 'repeat(auto-fill,68px)',
            gridGap: '1rem',
            width: '100%',
            margin: '15px 0'
          }}>
            {documentsGroups[k].map((d, i) => (
              <LangLink key={i} to={`doc/${d.slug}`}>
                <MiniDocument doc={d}/>
              </LangLink>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  ))
}

export default DocumentsGrid
