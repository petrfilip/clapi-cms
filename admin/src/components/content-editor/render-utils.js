import { h } from 'preact'
import ComponentEditWrapper from './components/component-edit-wrapper'

export const renderInputs = (config, editor) => {
  return Object.entries(config).map(([key, newProps], index) => {
    if (!config[key].type) {
      //todo replace with config.type=== content
      return
    }

    newProps.onChangeObjectCallback = (object) => {
      return editor.onChangeObjectCallback && editor.onChangeObjectCallback({ config: newProps, item: object })
    }

    newProps.onInputChangeCallback = (id, value) => {
      editor.setInputObject((currentState) => {
        currentState[id] = value
        return { ...currentState }
      })
    }
    newProps.initialValue = editor.inputObject && editor.inputObject[key]
    newProps.id = key
    newProps.index = index
    return h(ComponentEditWrapper, newProps)
  })
}
