import { React } from 'preact'
import Input from '../../elementary/input'

const SimpleText = (props) => (
  <Input
    value={props.initialValue || ''}
    name={props.id}
    key={props.id}
    type={'text'}
    maxLength={(props.config && props.config.maxLength) || 999}
    placeholder={props.config && props.config.placeholder}
    onInput={(event) =>
      (props.onInput && props.onInput(event)) ||
      (props.onInputChangeCallback && props.onInputChangeCallback(props.id, event.target.value))
    }
  />
)

export default SimpleText
