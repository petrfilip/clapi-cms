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

export const ContentEditorComponents = {
    SimpleText: { component: SimpleText, config: { placeholder } },
    TextArea: { component: TextArea, config: { placeholder } },
    Block: { component: Block, config: { placeholder } },
    Group: { component: Group, config: { placeholder } },
    MediaSelect: { component: MediaSelect, config: { placeholder } },
    ImageSelect: { component: ImageSelect, config: { placeholder } },
    FileSelect: { component: FileSelect, config: { placeholder } },
    DocumentLink: { component: DocumentLink, config: { placeholder } },
    DatePicker: { component: DatePicker, config: { placeholder } },
    GeoPicker: { component: GeoPicker, config: { placeholder } },
    BooleanInput: { component: BooleanInput, config: { placeholder } },
    SelectInput: { component: SelectInput, config: { placeholder } },
    NumberInput: { component: NumberInput, config: { placeholder } },
    ColorPicker: { component: ColorPicker, config: { placeholder } },
    CheckboxInput: { component: CheckboxInput, config: { placeholder } },
    RadioInput: { component: RadioInput, config: { placeholder } },
    EmbeddedContent: { component: EmbeddedContent, config: { placeholder } },
}
