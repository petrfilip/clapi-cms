import {h} from 'preact';
import style from "./component-edit-wrapper.css"
import {ContentEditorComponents} from "../content-editor-components";

const ComponentEditWrapper = (props) => (
    <div>
      <label className={style.label}>
        {props.config.label} | <span className={style.apiKey}>{props.id}</span>
      </label>
      {h(ContentEditorComponents[props.type], props)}
    </div>
);

export default ComponentEditWrapper;
