import { React } from 'preact'
import Checkbox from '../../elementary/checkbox'
import Input from '../../elementary/input'

function generateRandomString() {
  return Math.random().toString(36).substring(7)
}

const CheckboxInput = (props) => (
  <Checkbox
    {...props}
    type="checkbox"
    checked={props.initialValue}
    name={props.id || generateRandomString()}
    key={props.id || generateRandomString()}
    onInput={(event) =>
      (props.onInput && props.onInput(event)) ||
      (props.onInputChangeCallback && props.onInputChangeCallback(props.id, event.target.checked))
    }
  />
)

export default CheckboxInput
