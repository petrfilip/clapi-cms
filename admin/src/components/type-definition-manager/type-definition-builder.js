import { useContext } from 'preact/hooks'
import TypeDefinitionInputSettings from './type-definition-input-settings'
import styled from 'styled-components'
import TypeDefinitionGroupBuilder from './type-definition-group-builder'
import TypeDefinitionDropArea from './type-definition-drop-area'
import { LayoutContext } from '../layout/layout-context'
import TypeDefinitionBuilderBlockComponent from './type-definition-builder-block-component'
import React, { Component } from 'react'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { getPropertyOnIndex } from '../../utils/object-utils'

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

function getActionButtons(onRemoveDefinition, key, setActionSidebar, index, item, onNewDefinition, onUpdateDefinition) {
  return (
    <ActionButtons>
      <ActionButton onClick={() => onRemoveDefinition(key)}>D</ActionButton>
      <ActionButton
        onClick={() =>
          setActionSidebar(
            <TypeDefinitionInputSettings
              values={{
                position: index,
                fieldName: item.config.label,
                apiKey: key,
                specificSettings: item.config,
              }}
              position={index}
              onConfirm={onNewDefinition}
              componentKey={item.type}
            />
          )
        }
      >
        S
      </ActionButton>
      <ActionButton>
        <DragHandle />
      </ActionButton>
      {/*<ActionButton*/}
      {/*  onClick={() => {*/}
      {/*    const move = {*/}
      {/*      apiKey: key,*/}
      {/*      position: index + 1,*/}
      {/*      value: item,*/}
      {/*    }*/}

      {/*    onUpdateDefinition(move)*/}
      {/*  }}*/}
      {/*>*/}
      {/*  D*/}
      {/*</ActionButton>*/}
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
      {getActionButtons(onRemoveDefinition, key, setActionSidebar, index, item, onNewDefinition, onUpdateDefinition)}
    </ComponentPlaceholder>
  )
}

const DragHandle = SortableHandle(() => <span>::</span>)

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
  const SortableItem = SortableElement(({ value }) => (
    <div>
      {getDropContainer(value.index, setActionSidebar, onNewDefinition)}
      {getComponentPlaceholder(
        value.type,
        typeDefinitionConfig[value.type],
        value.index,
        onRemoveDefinition,
        setActionSidebar,
        onNewDefinition,
        onUpdateDefinition
      )}
    </div>
  ))

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={{ type: value, index }} />
        ))}
      </div>
    )
  })
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) {
      return
    }
    const propName = getPropertyOnIndex(configToRender, oldIndex)
    const move = {
      apiKey: propName,
      position: newIndex,
      value: configToRender[propName],
    }

    onUpdateDefinition(move)
  }

  return (
    <>
      <SortableList items={Object.keys(configToRender)} onSortEnd={onSortEnd} useDragHandle />

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

const ActionButton = styled.div`
  display: inline-block;
  width: 20px;
  margin: 4px;
  text-align: center;
  font-size: 10px;
  border-radius: 2px;
`

export default TypeDefinitionBuilder
