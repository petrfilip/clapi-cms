import React from 'preact/compat'
import styled from 'styled-components'

const Button = (props) => {
  return <StyledButton {...props} />
}

const StyledButton = styled.button`
  cursor: pointer;
  color: black;
  padding: 5px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.gray};
  margin: 5px;

  :disabled {
    opacity: 0.5;
  }

  :hover {
    background-color: ${(props) => props.theme.darkgray};
  }
`

export default Button
