import React from 'react'
import { ArrowUp, ArrowRightCircle } from 'react-feather'
import { get } from 'lodash'
import LangLink from '../LangLink'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ObjectContentCaption = ({ doc, caption='' }) => {
  const title = get(doc, 'data.title', 'untitled')
  const copyright = get(doc, 'data.copyright', '©')
  const history = useHistory()
  const { i18n } = useTranslation()
  // current position
  const handleLangLinkClick = (e, documentId) => {
    let nextUrl = history.location.pathname
    if (window.location.hash) {
      nextUrl = nextUrl + window.location.hash
    }
    e.preventDefault()
    history.push(`/${i18n.language.split('-')[0]}/doc/${doc.slug}?next=${nextUrl}`)
  }
  return (
    <div className="ObjectContentCaption small p-1">
      <div className="ObjectContentCaption_captionText  d-flex align-items-top">
        <div className="flex-shrink-1 mr-2">
          <ArrowUp size={18}/>
        </div>
        <div>
          <b>{title}</b> &middot; {copyright}
          {caption.length ? (<p>{caption}</p>) : null}
          &nbsp;&nbsp;
          {doc ? <LangLink onClick={(e) => handleLangLinkClick(e, doc.slug)} to={`/doc/${doc.slug}`} className="d-inline-flex align-items-center" style={{
              background: 'var(--dark)',// color: 'var(--white)',
              borderRadius: 5,
              fontSize: 14,
              padding: '0px 8px ',
              lineHeight: 'inherit',
              textTransform: 'uppercase'
            }}>
            <b style={{color: 'var(--white)' }}>more ...&nbsp;&nbsp;</b>
            <ArrowRightCircle size={16}
            color="var(--white)"/>
          </LangLink>
        : null}
        </div>
      </div>
    </div>
  )
}

export default ObjectContentCaption
