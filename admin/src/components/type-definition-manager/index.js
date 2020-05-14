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
import TypeDefinitionBuilderTabMenu from './type-definition-builder-tab-menu'
import { slugify } from '../../utils/string-utils'

const saveOrUpdate = (data, setTypeDefinition) => {
  DataManager.saveOrUpdate(api.fetchCollection('type-definition'), 'json', data, (callbackData) => {
    setTypeDefinition(callbackData)
  })
}

const TypeDefinitionEditor = (props) => {
  const { setMenu, setSidebar, setActionSidebar } = useContext(LayoutContext)
  const [typeDefinition, setTypeDefinition] = useState(props.typeDefinition || {})
  const [currentConfigTab, setCurrentConfigTab] = useState('main')
  const [typeDefinitionConfig, setTypeDefinitionConfig] = useState(
    (props.typeDefinition.data &&
      props.typeDefinition.data[currentConfigTab] &&
      props.typeDefinition.data[currentConfigTab].config) ||
      {}
  )

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
    // typeDefinition.config = typeDefinitionConfig
    saveOrUpdate(typeDefinition, setTypeDefinition)
  }

  useEffect(() => {
    setMenu(<Button onClick={saveOrUpdateAction}>update definition</Button>)
    typeDefinition.data[currentConfigTab].config = typeDefinitionConfig
    setTypeDefinition(typeDefinition)
    return () => {
      setMenu(null)
    }
  }, [typeDefinitionConfig])

  useEffect(() => {
    setTypeDefinitionConfig(props.typeDefinition.data[currentConfigTab].config)
    return () => {
      setMenu(null)
    }
  }, [currentConfigTab])

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

  const onTabClick = (tabKey) => {
    setCurrentConfigTab(tabKey)
  }
  const onNewTab = (newTab) => {
    typeDefinition.data[slugify(newTab)] = { name: newTab, config: {} }
    setTypeDefinition(typeDefinition)
    setCurrentConfigTab(slugify(newTab))
  }

  const getTabs = () => {
    return Object.keys(typeDefinition.data).map((item) => {
      return { key: item, label: typeDefinition.data[item].name }
    })
  }

  return (
    <>
      <TypeDefinitionBuilderTabMenu
        currentActiveTab={currentConfigTab}
        tabs={getTabs()}
        onTabClick={onTabClick}
        onNewTab={onNewTab}
      />
      <TypeDefinitionBuilder
        typeDefinitionConfig={typeDefinitionConfig}
        onNewDefinition={onNewDefinition}
        onUpdateDefinition={onUpdateDefinition}
        onRemoveDefinition={onRemoveDefinition}
        onUpdateContent={onUpdateContent}
      />
    </>
  )
}

export default TypeDefinitionEditor
