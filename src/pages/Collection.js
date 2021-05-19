import React, {useEffect} from 'react'
import { Container, Row, Col, ButtonGroup, Dropdown, FormControl } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDocuments } from '@c2dh/react-miller'
import { useCurrentWindowDimensions } from '../hooks'
import { useStore } from '../store'
import DocumentsGrid from '../components/DocumentsGrid'
import {
  useQueryParams,
  StringParam,
  ArrayParam,
  withDefault,
} from 'use-query-params';

const CollectionPager = ({ loading, pagination }) => {
  const { t } = useTranslation()
  if (loading) {
    return t('pagesCollectionLoading')
  }
  if(pagination) {
    return (
      <div dangerouslySetInnerHTML={{
        __html: t('pagesCollectionWithCount', { count: pagination.count})
      }}/>
    )
  }
  return t('pagesCollectionError')
}

const Collection = () => {
  const { height } = useCurrentWindowDimensions()
  const { t, i18n } = useTranslation()
  const {changeTheme} = useStore(state => state)

  useEffect(() => {
    changeTheme({
      name: 'themeCollection',
    })
  }, [changeTheme])
  const [query, setQuery] = useQueryParams({
    q: StringParam,
    g: withDefault(StringParam, 'data.type'),
    sort: withDefault(StringParam , 'asc'),
    filters: withDefault(ArrayParam, []),
  });
  console.info('current query', query)

  const [documents, pagination, { loading, error }] = useDocuments({
    limit: 1000,
    offset: 0,
    q: query.q,
    // filters: {
    //   data__type: queryString.type || undefined,
    // },
    exclude: { type: 'entity' },
    crossFacets: {
      allFacets: {
        facets: ['data__type'],
        exclude: { type: 'entity' },
      },
    },
  }, {
    language: i18n.language.split('-').join('_'),
    defaultLanguage: i18n.options.defaultLocale,
  })

  console.info('render page: Collection', error)
  const handleChangeSearchQuery = (event) => {
    if(!event.target.value.length || typeof event.target.value !== 'string') {
      setQuery({ q: null })
    } else {
      let q = event.target.value.trim()
      if (q.indexOf('*') === -1) {
        q = q + '*'
      }
      setQuery({ q })
    }
  }
  return (
    <div className="Collection position-relative text-white" style={{minHeight: height}}>
      <Container style={{paddingTop: '8rem'}}>
        <Row className="h-100 d-flex align-items-center">
          <Col>
            <h1 className="text-white">{t('pagesCollectionTitle')}</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className=" border-bottom border-white">
          <Col>
            <form className="form-inline mb-2">
            <FormControl className="mr-2 bg-transparent border border-white text-white" type="input"
              defaultValue={query.q}
              placeholder={t('pagesCollectionSearch')}
              onChange={handleChangeSearchQuery}>
            </FormControl>
            <CollectionPager loading={loading} pagination={pagination} />

            </form>
          </Col>
        </Row>
        <Row className="text-white border-bottom border-white">
          <Col>
            <Dropdown className="my-2" as={ButtonGroup}>
              <Dropdown.Toggle variant="link" id="dropdown-basic-button" className="p-0 pb-1">
                {t(`pagesCollectionSortingGroup-${query.g.replace('.','')}`)}
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-white">
                {['data.year', 'data.type', 'type', 'data.creator', 'all'].filter(g => g !== query.g).map((g,i) => (
                  <Dropdown.Item key={i} active={query.g === g} onClick={() => setQuery({ g })}>
                    {t(`pagesCollectionSortingGroup-${g.replace('.','')}`)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown className="my-2" as={ButtonGroup}>
              <Dropdown.Toggle variant="link" id="dropdown-basic-button" className="p-0 pb-1">
                {t(`pagesCollectionSortingOrder-${query.sort}`)}
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-white">
                {['asc', 'desc'].filter(sort => sort !== query.sort).map((sort, i) => (
                  <Dropdown.Item key={i} active={query.sort === sort} onClick={() => setQuery({ sort })}>
                    {t(`pagesCollectionSortingOrder-${sort}`)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
      <DocumentsGrid documents={documents || []} groupKey={query.g} ascending={query.sort==='asc'}/>
    </div>
  )
}

export default Collection
