import React from 'react'
import StoryModuleNotImplemented from './StoryModuleNotImplemented'

import StoryModuleTextObject from './StoryModuleTextObject'
import StoryModuleText from './StoryModuleText'
import StoryModuleObject from './StoryModuleObject'
import StoryModuleTextGallery from './StoryModuleTextGallery'
//
// const DocumentViewerPdf = lazy(() => import('./DocumentViewerPdf'))
// const DocumentViewerImage = lazy(() => import('./DocumentViewerImage'))
// const DocumentViewerVideo = lazy(() => import('./DocumentViewerVideo'))
// const AvailableComponents = {
//   'pdf': DocumentViewerPdf,
//   'image': DocumentViewerImage,
//   'video': DocumentViewerVideo,
// }
import '../../styles/components/StoryModule.scss'

const StoryModule = ({
  mod = {},
  height = 0,
  width=0,
  inViewport = false,
  progress=0.0,
  debug = false,
  storyDocuments=[],
  withMap = false,
  num = 0,
}) => {
  // console.info('StoryModule', mod, storyDocuments)
  const documentsIndex = storyDocuments.reduce((acc, d) => {
    acc[d.document_id] = d
    return acc
  }, {})

  let documents = []
  let StoryModuleComponent = StoryModuleNotImplemented
  let withFullBackground = false
  // let StoryModuleBackgroundComponent = null
  if (mod.module === 'text_object') {
    if (mod.object?.type === 'video') {
      withFullBackground = true
    }
    StoryModuleComponent = StoryModuleTextObject
    documents = [documentsIndex[mod.object.id]]
  } else if (mod.module === 'object') {
    StoryModuleComponent = StoryModuleObject
    documents = [documentsIndex[mod.id]]
    withFullBackground = true
  } else if (mod.module === 'text') {
    StoryModuleComponent = StoryModuleText
  } else if (mod.module === 'text_gallery') {
    StoryModuleComponent = StoryModuleTextGallery
    withFullBackground = true
    documents = mod.gallery.objects.map(d => documentsIndex[d.id])
  }

  return (
    <div className={`StoryModule my-5 d-flex align-items-center ${inViewport ? 'active' : '' }`} style={{
      minHeight: withMap
        ? height*.75
        : withFullBackground
          ? height
          : 'auto',
    }}>
      <StoryModuleComponent num={num} mod={mod} documents={documents} withMap={withMap} height={height}/>
    </div>
  )
}

export default React.memo(StoryModule)

// {withMap
//   ? (
//     <Container >
//       <Row>
//         <Col {...bootstrapColumnLayout}>
//           {debug
//             ? (
//               <>
//                 <b>{inViewport ? 'visible':'invisible'}</b> {progress}<br/>
//               </>
//             )
//             : null
//           }
//           <StoryModuleComponent mod={mod} documents={documents}/>
//         </Col>
//       </Row>
//     </Container>
//     )
//   :
//     (
//       <StoryModuleComponent mod={mod} documents={documents} withMap={withMap}/>
//     )
// }
