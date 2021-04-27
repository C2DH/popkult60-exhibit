const BootstrapColumnLayoutCenterWide = {
  md: { span: 8, offset: 2 }
}
const BootstrapColumnLayoutCenterFullWidth = {
  md: { span: 10, offset: 1 }
}
const BootstrapColumnLayoutCenter = {
  md: { span: 6, offset: 3 }
}
const BootstrapColumnLayoutSimpleCol = {
  md: { span: 6 }
}
const BootstrapColumnLayoutFullWidth = {
  md: { span: 10, offset: 2  }
}

export const getModuleLayout = (mod, withMap=false) => {
  const isBlockquote = mod.text?.content?.match(/(&gt;|>)(.*)/)
  const isHeading = mod.text?.content?.match(/##+/)
  let cols = [ BootstrapColumnLayoutCenterWide ]
  if (mod.module === 'text') {
    if (isBlockquote) {
      cols = withMap
        ? [ BootstrapColumnLayoutSimpleCol ]
        : [ BootstrapColumnLayoutCenterWide ]
    } else if (isHeading) {
      cols = [ BootstrapColumnLayoutCenterFullWidth ]
    }
  } else if (mod.module === 'text_object') {
    cols = withMap
      ? [ BootstrapColumnLayoutCenter, BootstrapColumnLayoutFullWidth ]
      : [ BootstrapColumnLayoutSimpleCol, BootstrapColumnLayoutSimpleCol ]
  } else if (mod.module === 'text_gallery') {
    cols = withMap
      ? [ BootstrapColumnLayoutFullWidth ]
      : [ BootstrapColumnLayoutCenterWide ]
  }
  return { isBlockquote, isHeading, cols }
}


export const isBackgroundModuleNeeded = (mod) => {
  if (!mod) {
    return false
  }
  if (mod.object?.type === 'video' || mod.object?.type === 'audio') {
    return true
  }
  return false
}
