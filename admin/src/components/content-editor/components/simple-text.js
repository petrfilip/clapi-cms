import { React } from 'preact'
import Input from '../../elementary/input'

function generateRandomString() {
  return Math.random().toString(36).substring(7)
}

function getOnInput(props) {
  return (event) => {
    ;(props.onInput && props.onInput(event)) ||
      (props.onInputChangeCallback && props.onInputChangeCallback(props.id, event.target.value))
  }
}

const SimpleText = (props) => {
  return (
    <Input
      value={props.initialValue || ''}
      key={[props.index, props.id, props.type].join('_')}
      type={(props.config && props.config.inputType) || 'text'}
      maxLength={props.maxLength || (props.config && props.config.maxLength) || 999}
      placeholder={(props.config && props.config.placeholder) || props.placeholder || ''}
      disabled={props.disabled || (props.config && props.config.disabled) || false}
      required={(props.config && props.config.isRequired) || false}
      onInput={getOnInput(props)}
    />
  )
}

export default SimpleText
