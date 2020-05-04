import React from 'preact/compat'
import Button from '../elementary/button'
import ComponentEditContentWrapper from './component-edit-content-wrapper'

const ContentEditorChoices = ({ initialData, config, onChangeCallback }) => {
  const options = config.map((item) => {
    return { label: item.metadata.snippetName, value: item.metadata.snippetKey }
  })

  const onContentChangeCallback = (index, value) => {
    if (typeof value === 'function') {
      //todo need to be improved
      initialData[index].value = Object.assign({}, initialData[index].value, value(initialData[index][value] || {}))
    } else {
      initialData[index].value = value
    }

    onChangeCallback(initialData)
  }

  const onInputTypeChangeCallback = (index, value) => {
    const newContent = [...initialData]
    newContent[index] = { type: value, value: {} }
    onChangeCallback(newContent)
  }

  const onAddBlockCallback = (value) => {
    const newContent = [...initialData]
    newContent.push({ type: value, value: {} })
    onChangeCallback(newContent)
  }

  return (
    <>
      <h2>Content</h2>
      {initialData.map((item, index) => {
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
          onAddBlockCallback(config[0].metadata.snippetKey)
        }}
      >
        Add block
      </Button>
    </>
  )
}

function addInput() {}

export default ContentEditorChoices
