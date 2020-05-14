import React from 'preact/compat'
import styled from 'styled-components'
import TypeDefinitionGroupBuilder from './type-definition-group-builder'
import { useContext, useEffect, useState } from 'preact/hooks'
import Button from '../elementary/button'
import { LayoutContext } from '../layout/layout-context'
import TypeDefinitionSnippetSettingsForm from './type-definition-snippet-settings-form'
import Switch from '../elementary/switch'

function newContentTypeButton(setCurrentSnippet, setActionSidebar, setConfig, config) {
  return (
    <Button
      onClick={() => {
        setCurrentSnippet(null)
        setActionSidebar(
          <TypeDefinitionSnippetSettingsForm
            onDoneButtonClick={(data) => {
              const newSnippet = {
                metadata: {
                  snippetName: data.snippetName,
                  snippetKey: data.snippetKey,
                },
                config: {},
              }
              setConfig([...config, newSnippet])
              setCurrentSnippet(newSnippet)
              setActionSidebar(null)
            }}
          />
        )
      }}
    >
      Add
    </Button>
  )
}

function contentTypeListButtons(config, setCurrentSnippet, setActionSidebar) {
  return (
    <>
      {config.map((item) => {
        return (
          <>
            <Button onClick={() => setCurrentSnippet(item)}>{item.metadata.snippetName}</Button>
            <span
              onClick={() => {
                setCurrentSnippet(item)
                setActionSidebar(
                  <TypeDefinitionSnippetSettingsForm
                    value={item.metadata}
                    onDoneButtonClick={(data) => {
                      //todo implements update logic
                    }}
                  />
                )
              }}
            >
              Edit
            </span>
          </>
        )
      })}
    </>
  )
}

function renderContentTypeBuilder(currentSnippet, setConfig, config) {
  return (
    <>
      {currentSnippet && (
        <TypeDefinitionGroupBuilder
          typeDefinitionConfig={currentSnippet.config || {}}
          onUpdateDefinition={(data) => {
            currentSnippet.config = data
            setConfig(
              config.map((obj) =>
                obj.metadata.snippetKey === currentSnippet.metadata.snippetKey ? currentSnippet : obj
              )
            )
          }}
        />
      )}
    </>
  )
}

const TypeDefinitionBuilderBlockComponent = ({ initialData, onUpdateCallback }) => {
  const [isContentAllowed, setIsContentAllowed] = useState(true)
  const [currentSnippet, setCurrentSnippet] = useState(initialData[0] || null)
  const { setActionSidebar } = useContext(LayoutContext)

  useEffect(() => {
    setCurrentSnippet(initialData[0] || null)
  }, [initialData])

  return (
    <>
      <h3>Content</h3>
      <Switch
        initialValue={isContentAllowed}
        onInput={(e) => {
          setIsContentAllowed(e.target.checked)
        }}
      />
      {isContentAllowed && (
        <ComponentWrapper>
          {newContentTypeButton(setCurrentSnippet, setActionSidebar, onUpdateCallback, initialData)}
          {contentTypeListButtons(initialData, setCurrentSnippet, setActionSidebar)}
          {renderContentTypeBuilder(currentSnippet, onUpdateCallback, initialData)}
        </ComponentWrapper>
      )}
    </>
  )
}

const ComponentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ItemWrapper = styled.div`
  width: 20%;
  min-width: 120px;
`

export default TypeDefinitionBuilderBlockComponent
