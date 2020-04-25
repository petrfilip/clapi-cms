import {React} from "preact";

const ColorPicker = (props) => (
    <input
        value={props.initialValue}
        name={props.id}
        key={props.id}
        type={"color"}
        onInput={(event) => props.onInputChangeCallback(props.id,
            event.target.value)}
    />
);

export default ColorPicker;
