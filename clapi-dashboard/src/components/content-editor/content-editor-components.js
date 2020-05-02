import SimpleText from './components/simple-text'
import TextArea from './components/text-area'
import Block from './components/block'
import Group from './components/group'
import MediaSelect from './components/media-select'
import DocumentLink from './components/document-link'
import DatePicker from './components/date-picker'
import GeoPicker from './components/geo-picker'
import BooleanInput from './components/boolean-input'
import SelectInput from './components/select-input'
import EmbeddedContent from './components/embedded-content'
import NumberInput from './components/number-input'
import ColorPicker from './components/color-picker'
import CheckboxInput from './components/checkbox-input'
import RadioInput from './components/radio-input'
import ImageSelect from './components/image-select'
import FileSelect from './components/file-select'

const placeholder = {
  type: 'SimpleText',
  config: {
    label: 'Placeholder',
  },
}

const isRequired = {
  type: 'CheckboxInput',
  config: {
    label: 'Is required',
  },
}

export const ContentEditorComponents = {
  SimpleText: { component: SimpleText, config: { placeholder, isRequired } },
  TextArea: { component: TextArea, config: { placeholder, isRequired } },
  Block: { component: Block, config: { placeholder, isRequired } },
  Group: { component: Group, config: { placeholder, isRequired } },
  MediaSelect: { component: MediaSelect, config: { placeholder, isRequired } },
  ImageSelect: { component: ImageSelect, config: { placeholder, isRequired } },
  FileSelect: { component: FileSelect, config: { placeholder, isRequired } },
  DocumentLink: { component: DocumentLink, config: { placeholder, isRequired } },
  DatePicker: { component: DatePicker, config: { placeholder, isRequired } },
  GeoPicker: { component: GeoPicker, config: { placeholder, isRequired } },
  BooleanInput: { component: BooleanInput, config: { placeholder, isRequired } },
  SelectInput: { component: SelectInput, config: { placeholder, isRequired } },
  NumberInput: { component: NumberInput, config: { placeholder, isRequired } },
  ColorPicker: { component: ColorPicker, config: { placeholder, isRequired } },
  CheckboxInput: { component: CheckboxInput, config: { placeholder, isRequired } },
  RadioInput: { component: RadioInput, config: { placeholder, isRequired } },
  EmbeddedContent: { component: EmbeddedContent, config: { placeholder, isRequired } },
}
