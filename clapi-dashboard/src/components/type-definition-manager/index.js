import { useContext, useEffect, useState } from 'preact/hooks'
import * as api from '../../api'
import DataManager from '../data-loader/data-manager'
import TypeDefinitionBuilder from './type-definition-builder'
import TypeDefinitionBuilderMenu from './type-definition-builder-menu'

import React from 'preact/compat'
import { LayoutContext } from '../menu/layout-context'
import Button from '../elementary/button'
import { addToObject, removeFromObject } from '../../utils/object-utils'

const saveOrUpdate = (data) => {
    DataManager.saveOrUpdate(
        api.fetchCollection('type-definition'),
        'json',
        data
    )
}

const TypeDefinitionEditor = (props) => {
    const { setMenu, setSidebar, setActionSidebar } = useContext(LayoutContext)
    const [typeDefinition, setTypeDefinition] = useState(
        props.typeDefinition || {}
    )
    const [typeDefinitionConfig, setTypeDefinitionConfig] = useState(
        props.typeDefinition.config || {}
    )

    const onNewDefinition = (obj) => {
        const updatedConfig = addToObject(
            typeDefinitionConfig,
            obj.apiKey,
            obj.value,
            obj.position
        )
        setTypeDefinitionConfig(updatedConfig)
    }

    const onUpdateDefinition = (obj) => {
        const remove = removeFromObject(typeDefinitionConfig, obj.apiKey)
        const add = addToObject(remove, obj.apiKey, obj.value, obj.position)
        setTypeDefinitionConfig(add)
    }

    const onRemoveDefinition = (key) => {
        setTypeDefinitionConfig(removeFromObject(typeDefinitionConfig, key))
    }

    function saveOrUpdateAction() {
        typeDefinition.config = typeDefinitionConfig
        saveOrUpdate(typeDefinition)
    }

    useEffect(() => {
        setMenu(<Button onClick={saveOrUpdateAction}>update definition</Button>)

        return () => {
            setMenu(null)
        }
    }, [typeDefinitionConfig])

    useEffect(() => {
        setSidebar(<TypeDefinitionBuilderMenu />)

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
        />
    )
}

export default TypeDefinitionEditor
