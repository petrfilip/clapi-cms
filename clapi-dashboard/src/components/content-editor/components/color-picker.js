import Input from "../../elementary/input";

const ColorPicker = (props) => (
    <Input
        value={props.initialValue}
        name={props.id}
        key={props.id}
        type={"color"}
        onInput={(event) => props.onInputChangeCallback(props.id,
            event.target.value)}
    />
);

export default ColorPicker;
