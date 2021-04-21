import React from 'react'
import TextContent from '../TextContent'
import ObjectContent from '../ObjectContent'
import { get } from 'lodash'
import { useBoundingClientRect } from '../../hooks'


const StoryModuleTextObject = ({ mod, documents, backgroundStyles }) => {
  const layout = get(mod, "layout", "text-object")
  const [{ left, width }, ref] = useBoundingClientRect({ accurate: true})
  console.info('StoryModuleTextObject useBoundingClientRect', left, width)
  return (
    <div ref={ref} className={`StoryModuleTextObject ${layout} w-100`}>
      <div className="mb-5">
        <TextContent textConfig={mod.text} />
      </div>
      {documents.map((d, i) => (
        <ObjectContent key={i} document={d} objectConfig={mod.object}
          availableHeight={window.innerHeight * .75}
          availableWidth={width + left - 20}
          style={{
            marginLeft: -left,
          }}
        />
      ))}
    </div>
  )
}

export default StoryModuleTextObject
