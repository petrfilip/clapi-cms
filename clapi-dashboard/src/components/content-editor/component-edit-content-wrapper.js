import React from 'preact/compat'
import styled from 'styled-components'
import Select from '../elementary/select'
import { renderInputs } from './render-utils'
import { useEffect, useState } from 'preact/hooks'

const ComponentEditContentWrapper = ({ options, config, item, onTypeChange, onChangeCallback }) => {
  const itemConfiguration = config && config.find((it) => it.metadata.snippetKey === item.type).config
  const [inputObject, setInputObject] = useState(item.value || {})

  useEffect(() => {
    onChangeCallback(inputObject)
  }, [inputObject])

  return (
    <ComponentWrapper>
      <Select
        options={options}
        onInput={(e) => {
          setInputObject(null)
          onTypeChange(e.target.value)
        }}
      />
      <InputWrapper>{renderInputs(itemConfiguration, { inputObject, setInputObject })}</InputWrapper>
    </ComponentWrapper>
  )
}

const ComponentWrapper = styled.div`
  background-color: white;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 20px;
`
const InputWrapper = styled.div`
  background-color: ${(props) => props.theme.lightgray};
  margin: 10px;
  padding: 10px;
`

export default ComponentEditContentWrapper
