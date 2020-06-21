import React from 'preact/compat'
import styled from 'styled-components'
import RichTextArea from './rich-text-area'
import { useRef } from 'preact/hooks'
import { exec } from 'pell/dist/pell'

function replaceSelectionWithHtml(html) {
  var range
  if (window.getSelection && window.getSelection().getRangeAt) {
    range = window.getSelection().getRangeAt(0)
    range.deleteContents()
    var div = document.createElement('div')
    div.innerHTML = html
    var frag = document.createDocumentFragment(),
      child
    while ((child = div.firstChild)) {
      frag.appendChild(child)
    }
    range.insertNode(frag)
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange()
    range.pasteHTML(html)
  }
}

const ClapiRichTextArea = (props) => {
  const inputRef = useRef(null)
  const ref = inputRef && inputRef.current

  const actions = [
    {
      icon: '<b>B</b>',
      title: 'Bold',
      state: () => ref.queryCommandState('bold'),
      result: () => ref.execCommand('bold'),
    },
    {
      icon: '<strike>S</strike>',
      title: 'Strike-through',
      state: () => queryCommandState('strikeThrough'),
      result: () => exec('strikeThrough'),
    },
    {
      icon: '<i>I</i>',
      title: 'Italic',
      state: () => ref.queryCommandState('italic'),
      result: () => ref.execCommand('italic'),
    },
    {
      icon: '<u>U</u>',
      title: 'Underline',
      state: () => ref.queryCommandState('underline'),
      result: () => ref.execCommand('underline'),
    },
    {
      icon: '&#35;',
      title: 'Ordered List',
      result: () => ref.execCommand('insertOrderedList'),
    },
    {
      icon: '&#8226;',
      title: 'Unordered List',
      result: () => ref.execCommand('insertUnorderedList'),
    },
  ]

  return (
    <>
      <div>
        {actions.map((action) => (
          <FormatButton
            title={action.title}
            onClick={() => action.result()}
            dangerouslySetInnerHTML={{
              __html: action.icon,
            }}
          />
        ))}
      </div>
      <Editor ref={inputRef} {...props} />
    </>
  )
}

const FormatButton = styled.div`
  display: inline-block;
  padding: 5px;
  margin: 5px;
  border: 1px solid ${(props) => props.theme.darkgray};
  border-radius: 2px;
  min-width: 15px;
  text-align: center;
  font-size: 10px;
`

const Editor = styled(RichTextArea)`
  border: 1px solid ${(props) => props.theme.darkgray};

  > iframe {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    border: 0 !important;
    background: none !important;
    overflow: hidden;
  }

  > [is-placeholder] iframe {
    opacity: 0.5;
  }
`

export default ClapiRichTextArea
