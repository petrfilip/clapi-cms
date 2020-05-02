import { h } from 'preact'
import ComponentEditWrapper from './components/component-edit-wrapper'

export const renderInputs = (config, editor) => {
  return Object.entries(config).map(([key, newProps]) => {
    if (!config[key].type) {
      //todo replace with config.type=== content
      return
    }

    newProps.onInputChangeCallback = (id, value) => {
      editor.setInputObject((currentState) => {
        currentState[id] = value
        return { ...currentState }
      })
    }
    newProps.initialValue = editor.inputObject && editor.inputObject[key]
    newProps.id = key
    return h(ComponentEditWrapper, newProps)
  })
}
