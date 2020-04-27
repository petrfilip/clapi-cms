import {InputWrapper} from "../file-editor/input-wrapper";
import {useContext, useState} from "preact/hooks";
import {AppModalContext} from "../modal/AppModalContextProvider";
import Button from "../elementary/button";

const slugify = (string) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz______'
  const p = new RegExp(a.split('').join('|'), 'g')

  //todo replace dash (-) with underscore
  return string.toString().toLowerCase()
  .replace(/\s+/g, '_') // Replace spaces with -
  .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
  .replace(/&/g, '_and_') // Replace & with 'and'
  .replace(/[^\w\-]+/g, '') // Remove all non-word characters
  .replace(/\-\-+/g, '_') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '') // Trim - from end of text
}

const TypeDefinitionInputSettings = (props) => {

  const {setModalBody} = useContext(AppModalContext)
  const [fieldName, setFieldName] = useState(props.values && props.values.fieldName || "");
  const [apiKey, setApiKey] = useState(props.values && props.values.apiKey || "");

  return (<div>

    <h1>{props.componentKey}</h1>
    <InputWrapper label={"Field name"}>
      <input
          value={fieldName}
          onInput={e => {
            setFieldName(e.target.value);
            setApiKey(slugify(e.target.value));
          }}/>
    </InputWrapper>

    <InputWrapper label={"API key"}>
      <input value={apiKey} onInput={e => setApiKey(slugify(e.target.value))}/>
    </InputWrapper>

    <Button onClick={event => {
      event.preventDefault();
      const position = props.position;

      const value = {
        type: props.componentKey,
        config: {
          label: fieldName
        }
      }

      props.onConfirm({position, apiKey, value});
      setModalBody(null);
    }}>Done
    </Button>


  </div>);
};

export default TypeDefinitionInputSettings;