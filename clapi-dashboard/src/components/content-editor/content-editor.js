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

const saveOrUpdate = (data, setInputObject) => {
  DataManager.saveOrUpdate(api.fetchCollection(data.metadata.collectionName), 'json', data, (out) => {
    setInputObject(out)
    console.log(out)
    !data._id && out._id && route('/edit/' + data.metadata.collectionName + '/' + out._id)
  })
}

function renderForm(props, inputObject, setInputObject) {
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
      <h2>Content Editor</h2>
      {renderInputs(props.config, { inputObject, setInputObject })}
      <ContentEditorChoices
        initialData={inputObject.content}
        config={props.config.content || []}
        onChangeCallback={onContentChange}
      />
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
