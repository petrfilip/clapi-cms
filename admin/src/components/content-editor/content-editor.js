import { useContext, useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import * as api from '../../api'
import DataManager from '../data-loader/data-manager'

import { Center } from '../layout/center'
import Button from '../elementary/button'
import { LayoutContext } from '../layout/layout-context'
import React from 'preact/compat'
import { renderInputs } from './render-utils'
import ContentEditorChoices from './content-editor-choices'
import ContentEditorContentTabMenu from './content-editor-content-tab-menu'
import ContentEditorTabMenu from './content-editor-tab-menu'
import { StyledLink } from '../menu/menu-link'

const saveOrUpdate = (data, setInputObject) => {
  DataManager.saveOrUpdate(api.fetchCollection(data.metadata.collectionName), 'json', data, (out) => {
    setInputObject(out)
    !data._id && out._id && route('/admin/edit/' + data.metadata.collectionName + '/' + out._id)
  })
}

function renderForm(props, inputObject, setInputObject, onChangeObjectCallback) {
  function onContentChange(data) {
    const copyObject = Object.assign({}, inputObject)
    copyObject.content = data
    setInputObject(copyObject)
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      {/*<h2>{inputObject.metadata.collectionName}</h2>*/}
      {renderInputs(props.config, { inputObject, setInputObject, onChangeObjectCallback })}
      {props.config.content && props.config.content.length !== 0 && (
        <ContentEditorChoices
          initialData={inputObject.content || []}
          config={props.config.content || []}
          onChangeCallback={onContentChange}
        />
      )}
    </form>
  )
}

function checkVersion(props, inputObject) {
  return props.values.sys && props.values.sys.version && inputObject.sys.version < props.values.sys.version
}

function preventLeaveHandler(ev) {
  ev.preventDefault()
  return (ev.returnValue = 'Are you sure you want to close?')
}

const ContentEditor = (props) => {
  const [inputObject, setInputObject] = useState(props.values || {})
  const [currentConfigTab, setCurrentConfigTab] = useState('main')
  const [lastVisitedDirectory, setLastVisitedDirectory] = useState('/')
  const [changesSaved, setChangesSaved] = useState(false)

  const { setMenu, setSidebar, setActionSidebar } = useContext(LayoutContext)

  const onChangeObjectCallback = (data) => {
    if (data.config.type === 'ImageSelect') {
      setLastVisitedDirectory(data.item.path)
    }
    console.log('changeCallback', data)
  }

  useEffect(() => {
    setMenu(
      <>
        <StyledLink
          onClick={(ev) => {
            route('/admin/entries')
          }}
        >
          Home
        </StyledLink>

        <Button
          type="submit"
          onClick={() => {
            setChangesSaved(true)
            saveOrUpdate(inputObject, setInputObject)
          }}
        >
          Save
        </Button>
      </>
    )
    setSidebar(
      <>
        <ContentEditorTabMenu
          collectionName={inputObject.metadata.collectionName}
          objectToString={inputObject.data[currentConfigTab]}
        />
        <pre>{JSON.stringify(inputObject, null, 2)}</pre>
      </>
    )
    return () => {
      setMenu(null)
      setSidebar(null)
      setActionSidebar(null)
    }
  }, [inputObject, currentConfigTab])

  useEffect(() => {
    window.addEventListener('beforeunload', preventLeaveHandler)
    return () => {
      window.removeEventListener('beforeunload', preventLeaveHandler)
    }
  }, [])

  // checkVersion(props, inputObject) && setInputObject(props.values) //todo make it works

  const onUpdate = (newData) => {
    if (typeof newData === 'function') {
      //todo need to be improved
      inputObject.data[currentConfigTab] = newData(inputObject.data[currentConfigTab] || {})
    } else {
      inputObject.data[currentConfigTab] = newData
    }
    changesSaved && setChangesSaved(false)
    setInputObject(Object.assign({}, inputObject))
  }
  const onTabClick = (tabKey) => {
    console.log(tabKey)
    setCurrentConfigTab(tabKey)
  }
  const getTabs = () => {
    return Object.keys(props.config).map((item) => {
      return { key: item, label: props.config[item].name }
    })
  }

  const config = props.config[currentConfigTab]
  const data = inputObject.data[currentConfigTab]

  useEffect(() => {
    Object.keys(config.config).forEach((key) => {
      if (config.config[key].type === 'ImageSelect') {
        config.config[key].config.location = lastVisitedDirectory
      }
    })
  }, [lastVisitedDirectory])

  if (data && !data.content) {
    data.content = []
  }
  return (
    <>
      <ContentEditorContentTabMenu tabs={getTabs()} onTabClick={onTabClick} />
      <Center>{renderForm(config, data, onUpdate, onChangeObjectCallback)}</Center>
    </>
  )
}

export default ContentEditor
