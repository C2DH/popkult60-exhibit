import ObjectContentImage from './ObjectContentImage'
import '../../styles/components/ObjectContent.scss'
import { get } from 'lodash'


const ObjectContent = ({ objectConfig, document, goBig,
  availableWidth = 0,
  availableHeight = 0,
  className, style
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
      {objectConfig.caption && (
          <div className="ObjectContent_captionWrapper">
            <div className="ObjectContent_caption">
              <div className="ObjectContent_captionText bg-white">
                <p>{objectConfig.caption}</p>
              </div>
            </div>
          </div>
        )}
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
