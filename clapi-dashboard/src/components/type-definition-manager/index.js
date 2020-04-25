import {React} from "preact";
import {useState} from "preact/hooks";
import * as api from "../../api";
import DataManager from "../data-loader/data-manager";

const saveOrUpdate = (data) => {
  DataManager.saveOrUpdate(api.fetchCollection("type-definition"), "json", data)

}

const TypeDefinitionEditor = (props) => {
  const [typeDefinition, setTypeDefinition] = useState(
      props.typeDefinition || {});

  return (<div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <textarea rows={20}
              onInput={(event => setTypeDefinition(event.target.value))}>
    {JSON.stringify(typeDefinition, null, 2)}
    </textarea>
    <button onClick={() => saveOrUpdate(typeDefinition)}>update definition
    </button>
  </div>);
};

export default TypeDefinitionEditor;
