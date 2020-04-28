import {useContext} from "preact/hooks";
import {AppModalContext} from "../modal/AppModalContextProvider";
import TypeDefinitionInputSettings from "./type-definition-input-settings";
import React from "preact/compat";
import styled from "styled-components";
import TypeDefinitionGroupBuilder from "./type-definition-group-builder";
import {addToObject, removeFromObject} from "../../utils/object-utils";
import TypeDefinitionDropArea from "./type-definition-drop-area";

function getDropContainer(index, setModalBody, onNewDefinition) {

  return <TypeDefinitionDropArea dataTransferKey={"componentKey"}
                                 onDropEvent={(componentKey) => {
                                   setModalBody(<TypeDefinitionInputSettings
                                       values={{position: index}}
                                       onConfirm={onNewDefinition}
                                       componentKey={componentKey}/>)
                                 }}/>

}

const onAddNestedDefinition = (parent, fields, child) => {
  const updatedFields = addToObject(fields, child.apiKey, child.value, child.position)
  parent.config.fields = Object.assign({}, updatedFields)
}
//
// const onRemoveNestedDefinition = (parent, fields, child, onUpdateDefinition) => {
//   const updatedFields = removeFromObject(fields, child.apiKey)
//   parent.config.fields = Object.assign({}, updatedFields)
//   onUpdateDefinition(parent)
// }

// getTypeDefinitionBuilderContainer(item.config.fields || {}, setModalBody,
//     (out) => onAddNestedDefinition(item, item.config.fields || {}, out, onUpdateDefinition),
//     (out) => onRemoveNestedDefinition(item, item.config.fields || {}, out, onUpdateDefinition),
//     onUpdateDefinition)

function getActionButtons(onRemoveDefinition, key, setModalBody, index, item,
    onNewDefinition) {
  return <ActionButtons>
    <ActionButton
        onClick={() => onRemoveDefinition(key)}>D</ActionButton>
    <ActionButton onClick={() => setModalBody(<TypeDefinitionInputSettings
        values={{position: index, fieldName: item.config.label, apiKey: key}}
        position={index}
        onConfirm={onNewDefinition}
        componentKey={item.type}/>)}>S</ActionButton>
    <ActionButton>O</ActionButton>
  </ActionButtons>;
}

function getComponentPlaceholder(key, item, index, onRemoveDefinition,
    setModalBody, onNewDefinition, onUpdateDefinition) {
  return <ComponentPlaceholder>
    PLACEHOLDER NORMAL {key} - {index} - {item.type}
    {item.type === "Group" &&
    <TypeDefinitionGroupBuilder
        typeDefinitionConfig={item.config.fields || {}}
        onUpdateDefinition={(obj) => {
          item.config.fields = obj;
          onUpdateDefinition(Object.assign({}, item))
        }}/>

    }
    {getActionButtons(onRemoveDefinition, key, setModalBody, index, item, onNewDefinition)}
  </ComponentPlaceholder>;
}

function getTypeDefinitionBuilderContainer(typeDefinitionConfig, setModalBody,
    onNewDefinition, onRemoveDefinition, onUpdateDefinition) {
  return <>
    {Object.keys(typeDefinitionConfig).map((item, index) => {
      return <>
        {getDropContainer(index, setModalBody, onNewDefinition)}
        {getComponentPlaceholder(item, typeDefinitionConfig[item], index,
            onRemoveDefinition,
            setModalBody, onNewDefinition, onUpdateDefinition)}

      </>
    })
    }
    {getDropContainer(Object.keys(typeDefinitionConfig).length, setModalBody,
        onNewDefinition)}
  </>;
}

const TypeDefinitionBuilder = ({typeDefinitionConfig, onNewDefinition, onRemoveDefinition, onUpdateDefinition}) => {

  const {setModalBody} = useContext(AppModalContext)

  return (
      <TypeDefinitionBuilderContainer>
        {getTypeDefinitionBuilderContainer(typeDefinitionConfig, setModalBody,
            onNewDefinition, onRemoveDefinition, onUpdateDefinition)}
      </TypeDefinitionBuilderContainer>
  );
};

const TypeDefinitionBuilderContainer = styled.div`
  width: 90%;
`

const ComponentPlaceholder = styled.div`
  justify-content: space-between;
  display: flex;
  background-color: #e2e2e2;
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

export default TypeDefinitionBuilder;