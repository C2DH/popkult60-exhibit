import React from 'react'
import { ArrowUp, Maximize2 } from 'react-feather'
import { get } from 'lodash'
import { useStore } from '../../store'


const ObjectContentCaption = ({ doc, caption='' }) => {
  const title = get(doc, 'data.title', 'untitled')
  const copyright = get(doc, 'data.copyright', '©')
  const openDocumentFullScreen = useStore(state => state.openDocumentFullScreen)

  const onClickHandler = (e) => {
    e.preventDefault()
    openDocumentFullScreen(doc)
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
          <div className="ml-2 d-inline-flex align-items-center justify-content-between" onClick={onClickHandler} style={{
            border: '1px solid var(--dark)',
            borderRadius: 5,
            // color: 'var(--white)',
            textAlign: 'center',
            // height: 24,
            width: 70,
            // overflow: 'hidden',
            // lineHeight: '18px',
            padding: '0px 8px ',
            fontSize:11,
            lineHeight: 'inherit'
          }}><b>INFO</b>&nbsp;&nbsp;
            <Maximize2 size={16}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObjectContentCaption
