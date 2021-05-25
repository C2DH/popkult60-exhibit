import React from 'react'
import { useStore } from '../../store'
import ObjectContentCaption from '../ObjectContent/ObjectContentCaption'


const StoryModuleTextGalleryItem = ({ index , doc, data={}, type, ...props }) => {
  const openDocumentFullScreen = useStore(state => state.openDocumentFullScreen)

  const onClickHandler = () => {
    openDocumentFullScreen(doc)
  }
  return (
    <div  {...props} className="StoryModuleTextGalleryItem p-1">
        <img
          nopin="nopin"
          alt={data.title ? data.title : ""}
          src={data.resolutions.medium.url}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain'
          }}
        />
        <div onClick={onClickHandler} className="StoryModuleTextGalleryItem_caption">
          <ObjectContentCaption doc={doc} />
        </div>
      </div>
    );
}

export default StoryModuleTextGalleryItem
