import React from 'preact/compat'
import styled from 'styled-components'
import Select from '../elementary/select'
import { renderInputs } from './render-utils'
import { SortableHandle } from 'react-sortable-hoc'

function getOnInput(onChangeCallback, onTypeChange) {
  return (e) => {
    onChangeCallback({})
    onTypeChange(e.target.value)
  }
}

function typeSelect(options, item, onChangeCallback, onTypeChange) {
  return (
    options.length > 1 && (
      <Select defaultValue={item.type} options={options} onInput={getOnInput(onChangeCallback, onTypeChange)} />
    )
  )
}
const DragHandle = SortableHandle(() => <span>::</span>)

const ComponentEditContentWrapper = ({ index, options, config, item, onTypeChange, onChangeCallback }) => {
  const itemConfiguration = config && config.find((it) => it.metadata.snippetKey === item.type).config
  itemConfiguration.index = index
  return (
    <ComponentWrapper>
      <DragHandle />
      {typeSelect(options, item, onChangeCallback, onTypeChange)}
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
