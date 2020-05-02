import { useContext, useEffect, useState } from 'preact/hooks'
import * as api from '../../api'
import DataManager from '../data-loader/data-manager'
import TypeDefinitionBuilder from './type-definition-builder'
import TypeDefinitionBuilderComponentList from './type-definition-builder-component-list'

import React from 'preact/compat'
import { LayoutContext } from '../layout/layout-context'
import Button from '../elementary/button'
import { addToObject, removeFromObject } from '../../utils/object-utils'
import TypeDefinitionBuilderActionMenu from './type-definition-builder-action-menu'

const saveOrUpdate = (data, setTypeDefinition) => {
  DataManager.saveOrUpdate(api.fetchCollection('type-definition'), 'json', data, (callbackData) => {
    setTypeDefinition(callbackData)
  })
}

const TypeDefinitionEditor = (props) => {
  const { setMenu, setSidebar, setActionSidebar } = useContext(LayoutContext)
  const [typeDefinition, setTypeDefinition] = useState(props.typeDefinition || {})
  const [typeDefinitionConfig, setTypeDefinitionConfig] = useState(props.typeDefinition.config || {})

  const onNewDefinition = (obj) => {
    const updatedConfig = addToObject(typeDefinitionConfig, obj.apiKey, obj.value, obj.position)
    setTypeDefinitionConfig(updatedConfig)
  }

  const onUpdateDefinition = (obj) => {
    const remove = removeFromObject(typeDefinitionConfig, obj.apiKey)
    const add = addToObject(remove, obj.apiKey, obj.value, obj.position)
    setTypeDefinitionConfig(add)
  }

  const onUpdateContent = (contentData) => {
    setTypeDefinitionConfig({ ...typeDefinitionConfig, content: contentData })
  }

  const onRemoveDefinition = (key) => {
    setTypeDefinitionConfig(removeFromObject(typeDefinitionConfig, key))
  }

  function saveOrUpdateAction() {
    typeDefinition.config = typeDefinitionConfig
    saveOrUpdate(typeDefinition, setTypeDefinition)
  }

  useEffect(() => {
    setMenu(<Button onClick={saveOrUpdateAction}>update definition</Button>)

    return () => {
      setMenu(null)
    }
  }, [typeDefinitionConfig])

  useEffect(() => {
    setSidebar(
      <>
        <TypeDefinitionBuilderActionMenu objectToString={typeDefinition} collectionName={'type-definition'} />
        <TypeDefinitionBuilderComponentList />
      </>
    )

    return () => {
      setSidebar(null)
      setActionSidebar(null)
    }
  }, [])

  return (
    <TypeDefinitionBuilder
      typeDefinitionConfig={typeDefinitionConfig}
      onNewDefinition={onNewDefinition}
      onUpdateDefinition={onUpdateDefinition}
      onRemoveDefinition={onRemoveDefinition}
      onUpdateContent={onUpdateContent}
    />
  )
}

export default TypeDefinitionEditor
