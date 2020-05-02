import React from 'preact/compat'
import { useState } from 'preact/hooks'
import Button from '../elementary/button'
import ComponentEditContentWrapper from './component-edit-content-wrapper'

const ContentEditorChoices = ({ initialData, config, onChangeCallback }) => {
  const [content, setContent] = useState(initialData || [])

  const options = config.map((item) => {
    return { label: item.metadata.snippetName, value: item.metadata.snippetKey }
  })

  const onContentChangeCallback = (index, value) => {
    const newContent = [...content]
    newContent[index].value = value
    setContent(newContent)
    onChangeCallback(newContent)
  }

  const onInputTypeChangeCallback = (index, value) => {
    const newContent = [...content]
    newContent[index] = { type: value, value: {} }
    setContent(newContent)
    onChangeCallback(newContent)
  }

  return (
    <>
      <h2>Content</h2>
      {content.map((item, index) => {
        console.log(item)
        return (
          <ComponentEditContentWrapper
            config={config}
            item={item}
            options={options}
            onTypeChange={(data) => onInputTypeChangeCallback(index, data)}
            onChangeCallback={(data) => onContentChangeCallback(index, data)}
          />
        )
      })}

      <Button
        onClick={() => {
          setContent((prevState) => [...prevState, { type: config[0].metadata.snippetKey, value: {} }])
        }}
      >
        Add block
      </Button>
    </>
  )
}

function addInput() {}

export default ContentEditorChoices
