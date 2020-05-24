import React from 'react'
import arrayMove from 'array-move'
import ComponentEditContentWrapper from './component-edit-content-wrapper'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import Button from '../elementary/button'

function typeOptions(config) {
  const options = config.map((item) => {
    return { label: item.metadata.snippetName, value: item.metadata.snippetKey }
  })
  return options
}

const onInputTypeChangeCallback = (initialData, index, value) => {
  const newContent = [...initialData]
  newContent[index] = { type: value, value: {} }
  return newContent
}

const onContentChangeCallback = (initialData, index, value) => {
  if (typeof value === 'function') {
    //todo need to be improved
    initialData[index].value = Object.assign({}, initialData[index].value, value(initialData[index][value] || {}))
  } else {
    initialData[index].value = value
  }

  return initialData
}

const EditorItem = SortableElement(({ items, value, config, onChangeCallback }) => {
  return (
    <div>
      <ComponentEditContentWrapper
        key={value.index + '_nested-editable-component'}
        index={value.index}
        config={config}
        item={value.value}
        options={typeOptions(config)}
        onTypeChange={(data) => onChangeCallback(onInputTypeChangeCallback(items, value.index, data))}
        onChangeCallback={(data) => onChangeCallback(onContentChangeCallback(items, value.index, data))}
      />
      <Button
        key={value.index + '_add-button_looper'}
        onClick={() => {
          onChangeCallback(onAddBlockCallback(items, value.index + 1, config[0].metadata.snippetKey))
        }}
      >
        Add block
      </Button>
    </div>
  )
})

const ContentEditorChoicesSortable = SortableContainer(({ items, config, onChangeCallback }) => {
  return (
    <div>
      {items.map((value, index) => (
        <EditorItem
          items={items}
          key={`content-editor-item_${index}`}
          index={index}
          value={{ value, index }}
          config={config}
          onChangeCallback={onChangeCallback}
        />
      ))}
    </div>
  )
})

function getOnSortEnd(onChangeCallback, initialData) {
  return ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      onChangeCallback(arrayMove(initialData, oldIndex, newIndex))
    }
  }
}

const onAddBlockCallback = (initialData, index, value) => {
  const newContent = [...initialData]
  newContent.splice(index, 0, { type: value, value: {} })
  return newContent
}

const ContentEditorChoices = ({ initialData, config, onChangeCallback }) => {
  return (
    <div>
      <h2>Content</h2>
      <Button
        onClick={() => {
          onChangeCallback(onAddBlockCallback(initialData, 0, config[0].metadata.snippetKey))
        }}
      >
        Add block
      </Button>
      {
        <ContentEditorChoicesSortable
          items={initialData}
          config={config}
          onChangeCallback={onChangeCallback}
          onSortEnd={getOnSortEnd(onChangeCallback, initialData)}
          useDragHandle
        />
      }
    </div>
  )
}

export default ContentEditorChoices
