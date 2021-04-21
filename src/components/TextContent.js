import { get } from 'lodash'
import Markdown from 'markdown-to-jsx'

const TextContent = ({ textConfig, isTextModule }) => {
  const textAlign = get(textConfig, "position", "left");
  const blockquote = textConfig.content.match(/(&gt;|>)(.*)/) ? true : false; // TODO: it works just if text starts with quote

  return (
    <div
      className="TextContent"
      style={{
        color: textConfig.color,
        textAlign
      }}
    >
      {blockquote
        ? (
          <Markdown
            className="TextContent_textQuotation"
            children={textConfig.content}
            options={{ forceBlock: true }}
          />
        ) :
        (
          <Markdown
            children={textConfig.content}
            options={{
              forceBlock: true
            }}
          />
        )
      }
      {/*<Markdown options={{ forceBlock: true }}>{textConfig.content}</Markdown>*/}
    </div>
  )
}

export default TextContent
