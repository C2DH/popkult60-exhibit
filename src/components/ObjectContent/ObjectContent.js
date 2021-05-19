import React from 'react'
import ObjectContentImage from './ObjectContentImage'
import DocumentViewerVideo from '../DocumentViewer/DocumentViewerVideo'
import { get } from 'lodash'
import '../../styles/components/ObjectContent.scss'
import ObjectContentCaption from './ObjectContentCaption'


const ObjectContent = ({ objectConfig, document, goBig,
  availableWidth = 0,
  availableHeight = 0,
  className, style,
  debug = false,
}) => {
  const objectContentWidth = get(document, 'data.resolutions.medium.width', window.innerHeight / 2)
  const objectContentHeight = get(document, 'data.resolutions.medium.height', window.innerHeight / 2)

  const isPortrait = objectContentHeight > objectContentWidth

  const width = isPortrait
    ? availableHeight * objectContentWidth / objectContentHeight // adapt to height
    : availableWidth // adapt to maximum width
  const height = isPortrait
    ? availableHeight
    : availableWidth * objectContentHeight / objectContentWidth

  if (debug && typeof objectConfig.caption === 'object') {
    console.error('wrong type for the caption:', objectConfig, document)
  }
  return (
    <div className={`ObjectContent ${className}`} style={style}>
      {(objectConfig.type === "image" || objectConfig.type === "pdf") && (
        <ObjectContentImage
          objectConfig={objectConfig}
          document={document}
          goBig={goBig}
          style={{
            width,
            height
          }}
        />
      )}
      {objectConfig.type === "video" && ( // see storyBackgroundModule
        <div className="text-white">
          <DocumentViewerVideo paddingTop={0} doc={document} height={availableHeight} />
        </div>
      )}
      <div className="ObjectContent_captionWrapper">
        <ObjectContentCaption caption={objectConfig.caption} doc={document} />
      </div>
    </div>
  )
}
  // return (
  //   <div className={styles.objectContainerWrapper}>
  //     <div
  //       className={classNames(styles.objectContainer, {
  //         [styles.videoMarginResponsive]:
  //           objectConfig.type === "video" ||
  //           objectConfig.type === "audio" ||
  //           goBig
  //       })}
  //     >
  //       <div className={styles.objectContent}>
  //         {(objectConfig.type === "image" || objectConfig.type === "pdf") && (
  //           <ObjectContentImage
  //             objectConfig={objectConfig}
  //             document={document}
  //             goBig={goBig}
  //           />
  //         )}
  //         {objectConfig.type === "video" && (
  //           <ObjectContentVideo
  //             objectConfig={objectConfig}
  //             document={document}
  //           />
  //         )}
  //         {objectConfig.type === "audio" && (
  //           <ObjectContentAudio
  //             objectConfig={objectConfig}
  //             document={document}
  //           />
  //         )}
  //       </div>
  //       {objectConfig.caption && (
  //         <div className={styles.captionWrapper}>
  //           <div className={styles.caption}>
  //             <div className={styles.captionText}>
  //               <p>{objectConfig.caption}</p>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

export default ObjectContent
