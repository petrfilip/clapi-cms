import React from 'preact/compat'
import styled from 'styled-components'
import Select from '../elementary/select'
import { renderInputs } from './render-utils'

const ComponentEditContentWrapper = ({ options, config, item, onTypeChange, onChangeCallback }) => {
  const itemConfiguration = config && config.find((it) => it.metadata.snippetKey === item.type).config

  return (
    <ComponentWrapper>
      {(options.length > 1 && (
        <Select
          options={options}
          onInput={(e) => {
            onChangeCallback({})
            onTypeChange(e.target.value)
          }}
        />
      )) ||
        options[0].label}
      <InputWrapper>
        {renderInputs(itemConfiguration, { inputObject: item.value || {}, setInputObject: onChangeCallback })}
      </InputWrapper>
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
