import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDocument } from '@c2dh/react-miller'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'react-feather'
import DocumentViewer from '../components/DocumentViewer'
import LangLink from '../components/LangLink'
import { useCurrentWindowDimensions } from '../hooks'
import { useStore } from '../store'
import '../styles/pages/DocumentDetail.scss'
import {
  useQueryParams,
  StringParam,
} from 'use-query-params';

const DocumentDetail = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const history = useHistory()
  const { width, height } = useCurrentWindowDimensions()
  const {changeTheme} = useStore(state => state)
  const [query] = useQueryParams({
    next: StringParam,
    h: StringParam
  });
  console.info('DocumentDetail', query)
  const [doc, {pending}] = useDocument(id, {
    language: i18n.language.split('-').join('_'),
    defaultLanguage: i18n.options.defaultLocale,
  })

  const handleLangLinkClick = (e) => {
    e.preventDefault();
    console.info('history', history.location)
    history.replace(query.next ?? '/collection')
  }
  useEffect(() => {
    changeTheme({
      name: 'themeDocumentDetail',
    })
  }, [changeTheme])

  return (
    <div
      className="DocumentDetail position-relative h-100"
    >
      <LangLink
        to={query.next ?? '/collection'}
        onClick={handleLangLinkClick}
        className="DocumentDetail_close d-flex align-items-center"
      >
        <ArrowLeft color="var(--white)"/>
        {query.next ? null : (<span className="ml-2 text-uppercase text-white font-weight-bold">
          {t('all resources')}
        </span>)}
      </LangLink>
      {doc
        ? <DocumentViewer doc={doc} width={width} height={height}/>
        : <div>{pending}</div>
      }
    </div>
  )
}

export default DocumentDetail
