import { h } from 'preact'
import ComponentEditWrapper from './components/component-edit-wrapper'
import { useContext, useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import * as api from '../../api'
import DataManager from '../data-loader/data-manager'

import { Center } from '../layout/center'
import Button from '../elementary/button'
import { LayoutContext } from '../menu/layout-context'
import React from 'preact/compat'

function renderInputs(config, editor) {
    return Object.entries(config).map(([key, newProps]) => {
        newProps.onInputChangeCallback = (id, value) => {
            editor.setInputObject((currentState) => {
                currentState[id] = value
                return { ...currentState }
            })
        }
        newProps.initialValue = editor.inputObject && editor.inputObject[key]
        newProps.id = key
        return h(ComponentEditWrapper, newProps)
    })
}

const saveOrUpdate = (data, setInputObject) => {
    DataManager.saveOrUpdate(api.fetchCollection(data.metadata.collectionName), 'json', data, (out) => {
        setInputObject(out)
        console.log(out)
        !data._id && out._id && route('/edit/' + data.metadata.collectionName + '/' + out._id)
    })
}

function renderForm(props, inputObject, setInputObject) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
            }}
        >
            <h2>Content Editor</h2>
            {renderInputs(props.config, { inputObject, setInputObject })}
        </form>
    )
}

function checkVersion(props, inputObject) {
    return props.values.sys && props.values.sys.version && inputObject.sys.version < props.values.sys.version
}

const ContentEditor = (props) => {
    const [inputObject, setInputObject] = useState(props.values || {})
    const { setMenu, setSidebar, setActionSidebar } = useContext(LayoutContext)

    useEffect(() => {
        setMenu(
            <Button
                type="submit"
                onClick={() => {
                    saveOrUpdate(inputObject, setInputObject)
                }}
            >
                Save
            </Button>
        )
        setSidebar(<pre>{JSON.stringify(inputObject, null, 2)}</pre>)
        return () => {
            setMenu(null)
            setSidebar(null)
            setActionSidebar(null)
        }
    }, [inputObject])

    checkVersion(props, inputObject) && setInputObject(props.values)
    return <Center>{renderForm(props, inputObject, setInputObject)}</Center>
}

export default ContentEditor
