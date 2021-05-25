import React from 'react'
import { ArrowUp, ArrowRightCircle } from 'react-feather'
import { get } from 'lodash'
import LangLink from '../LangLink'

const ObjectContentCaption = ({ doc, caption='' }) => {
  const title = get(doc, 'data.title', 'untitled')
  const copyright = get(doc, 'data.copyright', '©')

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
          <LangLink to={`/doc/${doc.slug}`} className="d-inline-flex align-items-center" style={{
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
        </div>
      </div>
    </div>
  )
}

export default ObjectContentCaption
