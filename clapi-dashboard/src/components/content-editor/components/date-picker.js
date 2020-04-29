import { React } from 'preact'

const DatePicker = (props) => (
    <input
        value={props.initialValue}
        name={props.id}
        key={props.id}
        type={'date'}
        min={props.config.min}
        max={props.config.max}
        onInput={(event) => props.onInputChangeCallback(props.id, event.target.value)}
    />
)

export default DatePicker
