import SimpleText from "./simple-text";
import TextArea from "./text-area";
import {h} from 'preact';
import Block from "./block";
import Group from "./group";
import MediaSelect from "./media-select";
import style from "./component-edit-wrapper.css"
import DocumentLink from "./document-link";
import DatePicker from "./date-picker";
import GeoPicker from "./geo-picker";
import BooleanInput from "./boolean-input";
import SelectInput from "./select-input";
import EmbeddedContent from "./embedded-content";
import NumberInput from "./number-input";
import ColorPicker from "./color-picker";
import CheckboxInput from "./checkbox-input";
import RadioInput from "./radio-input";

const Components = {
  SimpleText: SimpleText,
  TextArea: TextArea,
  Block: Block,
  Group: Group,
  MediaSelect: MediaSelect,
  DocumentLink: DocumentLink,
  DatePicker: DatePicker,
  GeoPicker: GeoPicker,
  BooleanInput: BooleanInput,
  SelectInput: SelectInput,
  NumberInput: NumberInput,
  ColorPicker: ColorPicker,
  CheckboxInput: CheckboxInput,
  RadioInput: RadioInput,
  EmbeddedContent: EmbeddedContent
};

const ComponentEditWrapper = (props) => (
    <div>
      <label className={style.label}>
        {props.config.label} | <span className={style.apiKey}>{props.id}</span>
      </label>
      {h(Components[props.type], props)}
    </div>
);

export default ComponentEditWrapper;
