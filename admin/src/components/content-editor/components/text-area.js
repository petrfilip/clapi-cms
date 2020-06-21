import { React } from 'preact'
import RichTextArea from 'preact-richtextarea'
import { useRef } from 'preact/hooks'

function getOnInput(props) {
  return (event) => {
    ;(props.onInput && props.onInput(event)) ||
      (props.onInputChangeCallback && props.onInputChangeCallback(props.id, value))
  }
}

const TextArea = (props) => {
  const inputRef = useRef(null)

  return (
    <RichTextArea
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
