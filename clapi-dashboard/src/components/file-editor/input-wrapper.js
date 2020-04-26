import {React} from "preact";

export const InputWrapper = (props) => (
    <div>
      <label>
        {props.label}
      </label>
      {props.children}
    </div>
);