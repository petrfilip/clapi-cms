import {useContext} from "preact/hooks";
import {AppModalContext} from "../modal/AppModalContextProvider";
import TypeDefinitionInputSettings from "./type-definition-input-settings";
import React from "preact/compat";
import styled from "styled-components";

function getDropContainer(index, setModalBody, onUpdateDefinition, onNewDefinition) {
  console.log("index",index)
  return <DropContainer key={index} id={index}
                        onDragOver={event => {
                          event.preventDefault();
                        }}
                        onDrop={(e) => {
                          const componentKey = e.dataTransfer.getData(
                              "componentKey");
                          setModalBody(<TypeDefinitionInputSettings
                              position={index}
                              onConfirm={(obj) => onNewDefinition(obj, onUpdateDefinition)}
                              componentKey={componentKey}/>)
                        }}>

  </DropContainer>;
}

function getComponentPlaceholder(item, index, onRemoveDefinition) {
  return <ComponentPlaceholder>
    PLACEHOLDER BUILDER {item} - {index}
    <ActionButtons>
      <ActionButton
          onClick={() => onRemoveDefinition(item)}>D</ActionButton>
      <ActionButton>S</ActionButton>
      <ActionButton>O</ActionButton>
    </ActionButtons>
  </ComponentPlaceholder>;
}

const onNewDefinition = (obj, onUpdateDefinition) => {
  console.log(obj);
  const newObj = obj[obj.apiKey] = {
    type: obj.value.type,
    config: {
      label: obj.value.config.label
    }
  }
  console.log(newObj);
  onUpdateDefinition(newObj);
};

const onRemoveDefinition = (obj) => {
  console.log(obj);
}

const TypeDefinitionGroupBuilder = ({parent, typeDefinitionConfig, onUpdateDefinition}) => {
  const {setModalBody} = useContext(AppModalContext)

  return (
      <TypeDefinitionBuilderContainer>
        {Object.keys(typeDefinitionConfig).map((item, index) => {
          return <>
            {getDropContainer(index, setModalBody,onUpdateDefinition, onNewDefinition)}
            {getComponentPlaceholder(item, index, onUpdateDefinition, onRemoveDefinition)}
          </>
        })
        }
        {getDropContainer(typeDefinitionConfig.length || 0, setModalBody,onUpdateDefinition, onNewDefinition)}
      </TypeDefinitionBuilderContainer>
  );
};

const TypeDefinitionBuilderContainer = styled.div`
  width: 50%;
`

const DropContainer = styled.div`
  padding: 10px;
  overflow: auto;
  text-align: center;
  font-size: 16px;
  background-color: bisque; 
  margin-top: 5px;
  margin-bottom: 5px;
`

const ComponentPlaceholder = styled.div`
  justify-content: space-between;
  display: flex;
  background-color: #888888;
  padding: 10px;
  font-size: 16px;
  border-radius: 2px;
`

const ActionButtons = styled.div`
  background: white;
  padding: 10px;
  margin: 10px;
  border-radius: 2px;
  border: 1px solid black;
  
`

const ActionButton = styled.span`
  width: 10px;
  padding: 5px;
  margin: 5px;
  text-align: center;
  font-size: 16px;
  border-radius: 2px;
`

export default TypeDefinitionGroupBuilder;