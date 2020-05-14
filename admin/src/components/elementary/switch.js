import React from 'preact/compat'
import styled from 'styled-components'
import Input from './input'
function generateRandomString() {
  return Math.random().toString(36).substring(7)
}
//source: https://codesandbox.io/s/6v7n1vr8yn?file=/src/index.js:307-1129
const Switch = (props) => {
  const componentId = props.id || generateRandomString()
  return (
    <div>
      <CheckBoxWrapper>
        <CheckBox
          id={componentId}
          type="checkbox"
          checked={props.initialValue}
          name={componentId}
          key={componentId}
          disabled={props.disabled || (props.config && props.config.disabled) || false}
          onInput={(event) =>
            (props.onInput && props.onInput(event)) ||
            (props.onInputChangeCallback && props.onInputChangeCallback(props.id, event.target.value))
          }
        />
        <CheckBoxLabel htmlFor={componentId} />
      </CheckBoxWrapper>
    </div>
  )
}

const CheckBoxWrapper = styled.div`
  position: relative;
`
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${(props) => props.theme.gray};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: ${(props) => props.theme.darkgray};
    transition: 0.2s;
  }
`
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: ${(props) => props.theme.primary};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      background: ${(props) => props.theme.white};

      margin-left: 21px;
      transition: 0.2s;
    }
  }
`

export default Switch
