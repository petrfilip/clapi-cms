import {InputWrapper} from "../file-editor/input-wrapper";
import {useContext, useEffect, useState} from "preact/hooks";
import {AppModalContext} from "../modal/AppModalContextProvider";
import Button from "../elementary/button";
import {LayoutContext} from "../menu/layout-context";
import TypeDefinitionBuilderMenu from "./type-definition-builder-menu";

const slugify = (text) => {
  return text
  .toString()                     // Cast to string
  .toLowerCase()                  // Convert the string to lowercase letters
  .normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
  .trim()                         // Remove whitespace from both sides of a string
  .replace(/\s+/g, '_')           // Replace spaces with -
  .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  .replace(/\-+/g, '_')        // Replace  - with single _
  .replace(/\_\_+/g, '_');        // Replace multiple _ with single _
}

const TypeDefinitionInputSettings = (props) => {

  const {setActionSidebar} = useContext(LayoutContext)
  const [fieldName, setFieldName] = useState(props.values && props.values.fieldName || "");
  const [apiKey, setApiKey] = useState(props.values && props.values.apiKey || "");


  useEffect(() => {
    setFieldName(props.values && props.values.fieldName || "");
    setApiKey(props.values && props.values.apiKey || "");
  },[props])

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
      const position = props.values.position;

      const value = {
        type: props.componentKey,
        config: {
          label: fieldName
        }
      }

      const settings = {position, apiKey, value};
      console.log("settings",settings);

      props.onConfirm(settings, props.values && props.values.apiKey);
      setActionSidebar(null);
    }}>Done
    </Button>

    <Button onClick={event => {
      event.preventDefault();
      setActionSidebar(null);
    }}>Cancel
    </Button>


  </div>);
};

export default TypeDefinitionInputSettings;