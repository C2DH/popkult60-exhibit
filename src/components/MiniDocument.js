import React, { useState } from 'react'
import { useTransition } from 'react-spring'
import { usePopper } from 'react-popper'
import { useTranslation } from 'react-i18next'
import IconSwitch from './IconSwitch'
import PopoverPreview from './PopoverPreview'
import styles from './MiniDocument.module.scss'
import {getTranslatableTypeFromMetadata} from '../logic/metadata'

const MiniDocument = ({ doc, mobile=false }) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const popper = usePopper(referenceElement, popperElement, {
    strategy: 'fixed',
  })

  const transition = useTransition(show, null, {
    from: { opacity: 0, transform: 'scale(0.25)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.25)' },
  })

  const imageUrl = doc.data.resolutions?.thumbnail.url

  return (
    <React.Fragment>
      <div
        className={styles.itemBlock}
        onMouseEnter={() => {
          if (mobile) return
          setShow(true)
        }}
        onMouseLeave={() => {
          if (mobile) return
          setShow(false)
        }}
        ref={setReferenceElement}
      >
        <div>
          {imageUrl ? (
            <img
              className={styles.smallImage}
              alt={doc.data.title}
              src={imageUrl}
            />
          ) : (
            <div
              className={`${styles.smallPreview} d-flex align-items-center justify-content-center`}
            >
              <IconSwitch color="var(--white)" type={doc.type}></IconSwitch>
            </div>
          )}
        </div>
      </div>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <PopoverPreview
              key={key}
              ref={setPopperElement}
              doc={doc}
              style={props}
              popper={popper}
              type={t(getTranslatableTypeFromMetadata({ type: doc.data.type }))}
            ></PopoverPreview>
          )
      )}
    </React.Fragment>
  )
}

export default React.memo(MiniDocument)
