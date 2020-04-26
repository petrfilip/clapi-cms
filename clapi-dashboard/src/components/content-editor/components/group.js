import {h, React} from "preact";
import {useEffect, useState} from "preact/hooks";
import ComponentEditWrapper from "./component-edit-wrapper";
import style from "./group.css"

function renderInputs(config, editor, groupIndex) {
  return Object.entries(config).map(([key, value], i) => {
        value.onInputChangeCallback = (id, value) => {
          editor.setInputObject(currentState => {
            currentState[groupIndex] = currentState[groupIndex] || {};
            currentState[groupIndex][id] = value
            return ({...currentState})
          });
          editor.onInputChangeCallback(editor.id, editor.inputObject)
        };
        value.initialValue = editor.inputObject && editor.inputObject[groupIndex]
            && editor.inputObject[groupIndex][key];
        value.id = key;
        return h(ComponentEditWrapper, value)
      }
  );
}

const Group = (props) => {
  const [inputObject, setInputObject] = useState(props.initialValue || []);
  //props.initialValue && setInputObject(props.initialValue)

  useEffect(() => {
    setInputObject(props.initialValue || [])
  }, [props.initialValue])

  const {fields} = props.config;
  const {id, onInputChangeCallback} = props;
  return (
      <>
        <div className={style.groupWrapper}>
          {Object.keys(inputObject).map((element, index) =>
              <div className={style.group} key={index}>
                <div className={style.actionButtons}>
                  <span>reorder</span>
                  <span>remove</span>
                </div>
                {renderInputs(fields,
                    {inputObject, setInputObject, onInputChangeCallback, id},
                    index)}
              </div>)}
          <button onClick={() => {
            setInputObject(prevState => [...prevState, {}])
          }}>Add new element
          </button>
        </div>
      </>
  )
};

export default Group;
