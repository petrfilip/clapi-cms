import {React} from "preact";
import {useContext} from "preact/hooks";
import {AppModalContext} from "../modal/AppModalContextProvider";
import TypeDefinitionInputSettings from "./type-definition-input-settings";

const style = {
  backgroundColor: "pink",
  width: "250px",
  height: "50px",
  margin: "5px"
}

const TypeDefinitionBuilder = ({typeDefinitionConfig, onNewDefinition}) => {

  const {setModalBody} = useContext(AppModalContext)

  return (
      <>
        {Object.keys(typeDefinitionConfig).map((item, index) => {
          return <>
            <div style={style} key={index} id={index}
                 onDragOver={event => {
                   event.preventDefault();
                 }}
                 onDrop={(e) => {
                   const componentKey = e.dataTransfer.getData(
                       "componentKey");
                   console.log("ondrop: ", e)
                   setModalBody(<TypeDefinitionInputSettings
                       position={index}
                       onNewDefinition={onNewDefinition}
                       componentKey={componentKey}/>)
                 }}>
              Dropable
            </div>
            <div>
              PLACEHOLDER {item} - {index}
              <div>
                <div>delete</div>
                <div>settings</div>
                <div>change order</div>
              </div>
            </div>
          </>
        })
        }
      </>
  );
};

export default TypeDefinitionBuilder;