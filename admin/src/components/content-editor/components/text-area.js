import React from 'preact/compat'
import { useRef } from 'preact/hooks'
import ClapiRichTextArea from '../../rich-text-area/clapi-rich-text-area'

function getOnInput(props) {
  return (event) => {
    ;(props.onInput && props.onInput(event)) ||
      (props.onInputChangeCallback && props.onInputChangeCallback(props.id, event.value))
  }
}

const TextArea = (props) => {
  const inputRef = useRef(null)

  return (
    <ClapiRichTextArea
      ref={inputRef}
      onpaste={(e) => {
        e.preventDefault()
        if (e.clipboardData) {
          const content = e.clipboardData.getData('text/plain')
          inputRef.current.execCommand('insertText', false, content)
        }
      }}
      value={props.initialValue}
      onInput={getOnInput(props)}
    />
  )
}

export default TextArea
