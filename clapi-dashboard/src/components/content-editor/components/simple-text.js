import {React} from "preact";

const SimpleText = (props) => (
    <input
        value={props.initialValue}
        name={props.id}
        key={props.id}
        type={"text"}
        maxLength={props.config.maxLength || 999}
        onInput={(event) => props.onInputChangeCallback(props.id,
            event.target.value)}
    />
);

export default SimpleText;
