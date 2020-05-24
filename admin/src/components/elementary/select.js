import React from 'preact/compat'
import styled from 'styled-components'
//todo will be replaced with react-select

const Select = ({ options, onInput, defaultValue }) => {
  return (
    <StyledSelect onInput={onInput}>
      {options.map((option) => {
        return (
          <option value={option.value} selected={option.value === defaultValue}>
            {option.label}
          </option>
        )
      })}
    </StyledSelect>
  )
}

const StyledSelect = styled.select`
  width: 97%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`

export default Select
