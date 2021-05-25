import React, { useMemo } from 'react'
import { animated } from 'react-spring'
import IconSwitch from '../IconSwitch'
import styles from './PopoverPreview.module.scss'
import { getDateFromMetadata } from '../../logic/metadata'

function getTranslate3d(transform) {
  if (!transform) return [0, 0, 0]
  var values = transform.split(/\w+\(|\);?/)
  if (!values[1] || !values[1].length) {
    return []
  }
  return values[1].split(/,\s?/g).map((d) => parseFloat(d))
}

const PopoverPreview = React.forwardRef((props, ref) => {
  const imageUrl = props.doc.data.resolutions?.thumbnail.url
  const top = props.popper.styles.popper.top
  const bottom = props.popper.styles.popper.bottom

  const transform = useMemo(() => {
    return getTranslate3d(props.popper.styles.popper.transform)
  }, [props.popper.styles.popper.transform])

  //TODO: parametrize top/bottom

  return (
    <animated.div
      ref={ref}
      className={styles.popoverContainer}
      style={{
        ...props.popper.styles.popper,
        top:
          top === 'auto'
            ? top
            : transform[1] < 150 + 68 / 2
            ? -transform[1]
            : -150 - 68 / 2,
        bottom:
          bottom === 'auto'
            ? bottom
            : transform[1] * -1 < 150 + 68 / 2
            ? transform[1]
            : -150 - 68 / 2,
      }}
    >
      <animated.div className={styles.popover} style={props.style}>
        <div style={props.style}>
          <p className={`${styles.label} m-0 text-capitalize text-primary`}>
            {props.type}
          </p>
        </div>
        <div className="flex-grow-1 flex-shrink-1 d-flex overflow-hidden flex-column my-2 bg-accent py-1">
          {imageUrl ? (
            <img
              className={styles.popoverImage}
              alt={props.doc.data.title}
              src={imageUrl}
            />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
              <IconSwitch color={'white'} type={props.doc.type}></IconSwitch>
            </div>
          )}
        </div>
        <div>
          <h2 className="m-0 text-white" style={{fontSize: 'inherit'}}>{props.doc.data.title}</h2>
          <p className="m-0 text-secondary">{getDateFromMetadata(props.doc.data)}</p>
        </div>
      </animated.div>
    </animated.div>
  )
})

export default PopoverPreview
