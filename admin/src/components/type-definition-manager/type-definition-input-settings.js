import { useContext, useEffect, useState } from 'preact/hooks'
import Button from '../elementary/button'
import { LayoutContext } from '../layout/layout-context'
import { ContentEditorComponents } from '../content-editor/content-editor-components'
import { renderInputs } from '../content-editor/render-utils'
import ComponentEditWrapper from '../content-editor/components/component-edit-wrapper'
import React from 'preact/compat'
import { slugify } from '../../utils/string-utils'

const TypeDefinitionInputSettings = (props) => {
  const { setActionSidebar } = useContext(LayoutContext)
  const [fieldName, setFieldName] = useState((props.values && props.values.fieldName) || '')
  const [apiKey, setApiKey] = useState((props.values && props.values.apiKey) || '')
  const [inputObject, setInputObject] = useState((props.values && props.values.specificSettings) || {})

  useEffect(() => {
    setFieldName((props.values && props.values.fieldName) || '')
    setApiKey((props.values && props.values.apiKey) || '')
    setInputObject((props.values && props.values.specificSettings) || {})
  }, [props])

  return (
    <div>
      <h1>{props.componentKey}</h1>

      <ComponentEditWrapper
        id={'fieldName'}
        label={'Field name'}
        type={'SimpleText'}
        initialValue={fieldName}
        onInput={(e) => {
          setFieldName(e.target.value)
          setApiKey(slugify(e.target.value))
        }}
      />

      <ComponentEditWrapper
        id={'apiKey'}
        label={'API key'}
        type={'SimpleText'}
        initialValue={apiKey}
        onInput={(e) => setApiKey(slugify(e.target.value))}
      />

      {renderInputs(ContentEditorComponents[props.componentKey].config, {
        inputObject,
        setInputObject,
      })}

      <Button
        onClick={(event) => {
          event.preventDefault()
          const position = props.values.position
          console.log(inputObject)

          const value = {
            type: props.componentKey,
            config: {
              label: fieldName,
              ...inputObject,
            },
          }

          const settings = { position, apiKey, value }
          console.log('settings', settings)

          props.onConfirm(settings, props.values && props.values.apiKey)
          setActionSidebar(null)
        }}
      >
        Done
      </Button>

      <Button
        onClick={(event) => {
          event.preventDefault()
          setActionSidebar(null)
        }}
      >
        Cancel
      </Button>
    </div>
  )
}

export default TypeDefinitionInputSettings
