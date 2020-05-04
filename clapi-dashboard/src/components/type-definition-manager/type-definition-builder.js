import { useContext } from 'preact/hooks'
import TypeDefinitionInputSettings from './type-definition-input-settings'
import React from 'preact/compat'
import styled from 'styled-components'
import TypeDefinitionGroupBuilder from './type-definition-group-builder'
import TypeDefinitionDropArea from './type-definition-drop-area'
import { LayoutContext } from '../layout/layout-context'
import TypeDefinitionBuilderBlockComponent from './type-definition-builder-block-component'

function getDropContainer(index, setActionSidebar, onNewDefinition) {
  return (
    <TypeDefinitionDropArea
      dataTransferKey={'componentKey'}
      onDropEvent={(componentKey) => {
        setActionSidebar(
          <TypeDefinitionInputSettings
            values={{ position: index }}
            onConfirm={onNewDefinition}
            componentKey={componentKey}
          />
        )
      }}
    />
  )
}

function getActionButtons(onRemoveDefinition, key, setActionSidebar, index, item, onNewDefinition) {
  return (
    <ActionButtons>
      <ActionButton onClick={() => onRemoveDefinition(key)}>D</ActionButton>
      <ActionButton
        onClick={() =>
          setActionSidebar(
            <TypeDefinitionInputSettings
              values={{ position: index, fieldName: item.config.label, apiKey: key, specificSettings: item.config }}
              position={index}
              onConfirm={onNewDefinition}
              componentKey={item.type}
            />
          )
        }
      >
        S
      </ActionButton>
      <ActionButton>O</ActionButton>
    </ActionButtons>
  )
}

function getComponentPlaceholder(
  key,
  item,
  index,
  onRemoveDefinition,
  setActionSidebar,
  onNewDefinition,
  onUpdateDefinition
) {
  return (
    <ComponentPlaceholder>
      {item.type} - {index} - {key}
      {item.type === 'Group' && (
        <TypeDefinitionGroupBuilder
          typeDefinitionConfig={item.config.fields || {}}
          onUpdateDefinition={(obj) => {
            item.config.fields = obj
            onUpdateDefinition(Object.assign({}, item))
          }}
        />
      )}
      {getActionButtons(onRemoveDefinition, key, setActionSidebar, index, item, onNewDefinition)}
    </ComponentPlaceholder>
  )
}

function getTypeDefinitionBuilderContainer(
  typeDefinitionConfig,
  setActionSidebar,
  onNewDefinition,
  onRemoveDefinition,
  onUpdateDefinition,
  onUpdateContent
) {
  //const configToRender = Object.assign({}, typeDefinitionConfig)
  //delete configToRender.content
  const configToRender = typeDefinitionConfig
  return (
    <>
      {Object.keys(configToRender).map((item, index) => {
        if (!configToRender[item].type) {
          return
        }
        return (
          <>
            {getDropContainer(index, setActionSidebar, onNewDefinition)}
            {getComponentPlaceholder(
              item,
              typeDefinitionConfig[item],
              index,
              onRemoveDefinition,
              setActionSidebar,
              onNewDefinition,
              onUpdateDefinition
            )}
          </>
        )
      })}
      {getDropContainer(Object.keys(typeDefinitionConfig).length, setActionSidebar, onNewDefinition)}
      <TypeDefinitionBuilderBlockComponent
        initialData={typeDefinitionConfig.content || []}
        onUpdateCallback={(newContent) => {
          onUpdateContent(newContent)
        }}
      />
    </>
  )
}

const TypeDefinitionBuilder = ({
  typeDefinitionConfig,
  onNewDefinition,
  onRemoveDefinition,
  onUpdateDefinition,
  onUpdateContent,
}) => {
  const { setActionSidebar } = useContext(LayoutContext)

  return (
    <>
      <TypeDefinitionBuilderContainer>
        {getTypeDefinitionBuilderContainer(
          typeDefinitionConfig,
          setActionSidebar,
          onNewDefinition,
          onRemoveDefinition,
          onUpdateDefinition,
          onUpdateContent
        )}
      </TypeDefinitionBuilderContainer>
    </>
  )
}

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

export default TypeDefinitionBuilder
