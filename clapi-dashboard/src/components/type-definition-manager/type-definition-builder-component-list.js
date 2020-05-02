import { ContentEditorComponents } from '../content-editor/content-editor-components'
import React from 'preact/compat'
import styled from 'styled-components'

const TypeDefinitionBuilderComponentList = () => {
  return (
    <MenuContainer>
      {Object.keys(ContentEditorComponents).map((componentKey) => {
        return (
          <MenuItem draggable onDragStart={(event) => event.dataTransfer.setData('componentKey', componentKey)}>
            {componentKey} ICON - NAME - DESCRIPTION
          </MenuItem>
        )
      })}
    </MenuContainer>
  )
}

const MenuContainer = styled.div`
  padding: 10px;
  margin: 10px;
  overflow: auto;
  text-align: center;
  font-size: 16px;
`

const MenuItem = styled.div`
  height: 40px;
  padding: 10px;
  margin: 10px;
  overflow: auto;
  background-color: #e2e2e2;
  font-size: 16px;
  border-radius: 2px;
`

export default TypeDefinitionBuilderComponentList
