import {useContext} from "preact/hooks";
import {AppModalContext} from "../modal/AppModalContextProvider";
import TypeDefinitionInputSettings from "./type-definition-input-settings";
import React from "preact/compat";
import styled from "styled-components";
import {addToObject, removeFromObject} from "../../utils/object-utils";
import TypeDefinitionDropArea from "./type-definition-drop-area";

function getDropContainer(typeDefinitionConfig, index, setModalBody,
    onUpdateConfig) {
  return <TypeDefinitionDropArea dataTransferKey={"componentKey"}
                                 onDropEvent={(componentKey) => {
                                   setModalBody(<TypeDefinitionInputSettings
                                       values={{position: index}}
                                       onConfirm={(obj) => onNewDefinition(
                                           typeDefinitionConfig, obj,
                                           onUpdateConfig)}
                                       componentKey={componentKey}/>)
                                 }}/>
}

// const onAddNestedDefinition = (parent, fields, child, onUpdateDefinition) => {
//   const updatedFields = addToObject(fields, child.apiKey, child.value,
//       child.position)
//   parent.config.fields = Object.assign({}, updatedFields)
//   // onUpdateDefinition(parent)
// }
//
// const onRemoveNestedDefinition = (parent, fields, child,
//     onUpdateDefinition) => {
//   const updatedFields = removeFromObject(fields, child.apiKey)
//   parent.config.fields = Object.assign({}, updatedFields)
//   onUpdateDefinition(parent)
// }

function getComponentPlaceholder(typeDefinitionConfig, key, item, index,
    setModalBody,
    onUpdateDefinition) {
  return <ComponentPlaceholder>
    PLACEHOLDER NORMAL {key} - {index} - {item.type}
    {item.type === "Group" &&
    getTypeDefinitionBuilderContainer(
        item.config.fields || {},
        setModalBody,
        onUpdateDefinition)
    }
    <ActionButtons>
      <ActionButton
          onClick={() => onRemoveDefinition(typeDefinitionConfig, key,
              onUpdateDefinition)}>D</ActionButton>
      <ActionButton
          onClick={() => setModalBody(<TypeDefinitionInputSettings
              values={{
                position: index,
                fieldName: item.config.label,
                apiKey: key
              }}
              position={index}
              onConfirm={onNewDefinition}
              componentKey={item.type}/>)}>S</ActionButton>
    </ActionButtons>
  </ComponentPlaceholder>;
}

function getTypeDefinitionBuilderContainer(typeDefinitionConfig, setModalBody,
    onUpdateDefinition) {
  return <>
    {Object.keys(typeDefinitionConfig).map((item, index) => {
      return <>
        {getDropContainer(typeDefinitionConfig, index, setModalBody,
            onUpdateDefinition)}
        {getComponentPlaceholder(typeDefinitionConfig, item,
            typeDefinitionConfig[item], index,
            setModalBody, onUpdateDefinition)}

      </>
    })
    }
    {getDropContainer(Object.keys(typeDefinitionConfig).length, setModalBody)}
  </>;
}

const onNewDefinition = (config, newDefObj, onUpdateDefinition) => {
  const updatedConfig = addToObject(config, newDefObj.apiKey, newDefObj.value,
      newDefObj.position)
  onUpdateDefinition(updatedConfig)
}

const onRemoveDefinition = (config, key, onUpdateDefinition) => {
  const updatedConfig = removeFromObject(config, key);
  onUpdateDefinition(updatedConfig)
}

const TypeDefinitionGroupBuilder = ({typeDefinitionConfig, onUpdateDefinition}) => {

  const {setModalBody} = useContext(AppModalContext)

  return (
      <TypeDefinitionGroupBuilderContainer>
        {getTypeDefinitionBuilderContainer(typeDefinitionConfig, setModalBody,
            onUpdateDefinition)}
      </TypeDefinitionGroupBuilderContainer>
  );
};

const TypeDefinitionGroupBuilderContainer = styled.div`
  background-color: ${props => props.theme.lightgray};
  padding: 10px;
  width: 90%;
`

const ComponentPlaceholder = styled.div`
  justify-content: space-between;
  display: flex;
  background-color: white;
  padding: 10px;
  font-size: 16px;
  border-radius: 2px;
`

const ActionButtons = styled.div`
  background: white;
  padding: 4px;
  margin: 5px;
  border-radius: 2px;
  border: 1px solid black;
  
`

const ActionButton = styled.span`
  width: 10px;
  margin: 4px;
  text-align: center;
  font-size: 10px;
  border-radius: 2px;
`

export default TypeDefinitionGroupBuilder;