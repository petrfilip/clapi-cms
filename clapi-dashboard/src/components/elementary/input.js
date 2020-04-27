import React from "preact/compat";
import styled from "styled-components";


const Input = (props) => {
  return (<StyledInput {...props} />)
};

const StyledInput = styled.input`
  margin: 5px;
  padding: 5px;
  width: 97%;
  border: 1px solid ${props => props.theme.darkgray};

`

export default Input;
