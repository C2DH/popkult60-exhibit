import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDocument } from '@c2dh/react-miller'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'react-feather'
import DocumentViewer from '../components/DocumentViewer'
import LangLink from '../components/LangLink'
import { useCurrentWindowDimensions } from '../hooks'
import { useStore } from '../store'
import '../styles/pages/DocumentDetail.scss'


const DocumentDetail = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const { width, height } = useCurrentWindowDimensions()
  const {changeTheme} = useStore(state => state)

  const [doc, {pending}] = useDocument(id, {
    language: i18n.language,
  })

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
        to="/collection"
        className="DocumentDetail_close d-flex align-items-center"
      >
        <ArrowLeft color="var(--white)"/>
        <span className="ml-2 text-uppercase text-white font-weight-bold">
          {t('all resources')}
        </span>
      </LangLink>
      {doc
        ? <DocumentViewer doc={doc} width={width} height={height}/>
        : <div>{pending}</div>
      }
    </div>
  )
}

export default DocumentDetail
