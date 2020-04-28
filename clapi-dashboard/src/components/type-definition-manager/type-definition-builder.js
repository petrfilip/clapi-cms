import {useContext} from "preact/hooks";
import TypeDefinitionInputSettings from "./type-definition-input-settings";
import React from "preact/compat";
import styled from "styled-components";
import TypeDefinitionGroupBuilder from "./type-definition-group-builder";
import {addToObject} from "../../utils/object-utils";
import TypeDefinitionDropArea from "./type-definition-drop-area";
import {LayoutContext} from "../menu/layout-context";

function getDropContainer(index, setActionSidebar, onNewDefinition) {

  return <TypeDefinitionDropArea dataTransferKey={"componentKey"}
                                 onDropEvent={(componentKey) => {
                                   setActionSidebar(<TypeDefinitionInputSettings
                                       values={{position: index}}
                                       onConfirm={onNewDefinition}
                                       componentKey={componentKey}/>)
                                 }}/>

}

function getActionButtons(onRemoveDefinition, key, setActionSidebar, index,
    item, onNewDefinition) {
  return <ActionButtons>
    <ActionButton
        onClick={() => onRemoveDefinition(key)}>D</ActionButton>
    <ActionButton onClick={() => setActionSidebar(<TypeDefinitionInputSettings
        values={{position: index, fieldName: item.config.label, apiKey: key}}
        position={index}
        onConfirm={onNewDefinition}
        componentKey={item.type}/>)}>S</ActionButton>
    <ActionButton>O</ActionButton>
  </ActionButtons>;
}

function getComponentPlaceholder(key, item, index, onRemoveDefinition,
    setActionSidebar, onNewDefinition, onUpdateDefinition) {
  return <ComponentPlaceholder>
    {item.type} - {index} - {key}
    {item.type === "Group" &&
    <TypeDefinitionGroupBuilder
        typeDefinitionConfig={item.config.fields || {}}
        onUpdateDefinition={(obj) => {
          item.config.fields = obj;
          onUpdateDefinition(Object.assign({}, item))
        }}/>

    }
    {getActionButtons(onRemoveDefinition, key, setActionSidebar, index, item,
        onNewDefinition)}
  </ComponentPlaceholder>;
}

function getTypeDefinitionBuilderContainer(typeDefinitionConfig,
    setActionSidebar,
    onNewDefinition, onRemoveDefinition, onUpdateDefinition) {
  return <>
    {Object.keys(typeDefinitionConfig).map((item, index) => {
      return <>
        {getDropContainer(index, setActionSidebar, onNewDefinition)}
        {getComponentPlaceholder(item, typeDefinitionConfig[item], index,
            onRemoveDefinition,
            setActionSidebar, onNewDefinition, onUpdateDefinition)}

      </>
    })
    }
    {getDropContainer(Object.keys(typeDefinitionConfig).length,
        setActionSidebar,
        onNewDefinition)}
  </>;
}

const TypeDefinitionBuilder = ({typeDefinitionConfig, onNewDefinition, onRemoveDefinition, onUpdateDefinition}) => {
  const {setActionSidebar} = useContext(LayoutContext)

  return (
      <TypeDefinitionBuilderContainer>
        {getTypeDefinitionBuilderContainer(typeDefinitionConfig,
            setActionSidebar,
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
  background-color: white;
  padding: 10px;
  font-size: 12px;
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

export default TypeDefinitionBuilder;