import {React} from "preact";
import {ContentEditorComponents} from "../content-editor/content-editor-components";

const style = {
  backgroundColor: "lightblue",
  width: "250px",
  height: "50px",
  margin: "5px"
}


const TypeDefinitionBuilderMenu = () => {

  return (<>
    {Object.keys(ContentEditorComponents).map((componentKey) => {
    return <div style={style} draggable
         onDragStart={event => event.dataTransfer.setData("componentKey",
             componentKey)}
    > {componentKey} ICON - NAME - DESCRIPTION
    </div>
    })}

  </>);
};

export default TypeDefinitionBuilderMenu;