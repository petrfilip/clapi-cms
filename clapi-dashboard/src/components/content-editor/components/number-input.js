import {React} from "preact";

const NumberInput = (props) => (
    <input
        value={props.initialValue}
        name={props.id}
        key={props.id}
        type={"number"}
        min={props.config.min}
        max={props.config.max}
        onInput={(event) => props.onInputChangeCallback(props.id,
            event.target.value)}
    />
);

export default NumberInput;
