import {useContext} from "preact/hooks";
import {AppModalContext} from "../modal/AppModalContextProvider";
import TypeDefinitionInputSettings from "./type-definition-input-settings";
import React from "preact/compat";
import styled from "styled-components";

const TypeDefinitionBuilder = ({typeDefinitionConfig, onNewDefinition}) => {

  const {setModalBody} = useContext(AppModalContext)

  return (
      <TypeDefinitionBuilderContainer>
        {Object.keys(typeDefinitionConfig).map((item, index) => {
          return <>
            <DropContainer key={index} id={index}
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

            </DropContainer>
            <ComponentPlaceholder>
              PLACEHOLDER {item} - {index}
              <ActionButtons>
                <ActionButton>D</ActionButton>
                <ActionButton>S</ActionButton>
                <ActionButton>O</ActionButton>
              </ActionButtons>
            </ComponentPlaceholder>
          </>
        })
        }
      </TypeDefinitionBuilderContainer>
  );
};

const TypeDefinitionBuilderContainer = styled.div`
  width: 90%;
`


const DropContainer = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px;
  overflow: auto;
  text-align: center;
  font-size: 16px;
  background-color: bisque; 
  
`

const ComponentPlaceholder = styled.div`
justify-content: space-between;
  display: flex;
  background-color: #e2e2e2;
  width: 100%;
  padding: 10px;
  margin: 10px;
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