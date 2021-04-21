import React from "react";
import TextContent from "../TextContent";
// import { get } from "lodash";

const ModuleText = ({ mod, backgroundStyles }) => {
  // const layout = get(mod, "layout", "text-object")
  // console.info('ModuleTextObject layout:', layout)
  return (
    <div className="StoryModuleText bg-white p-5">
      <TextContent textConfig={mod.text} />
    </div>
  )
}

export default ModuleText
