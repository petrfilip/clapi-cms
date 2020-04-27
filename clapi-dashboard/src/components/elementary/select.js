import React from "preact/compat";
import styled from "styled-components";


const Select = (props) => {
  return (<StyledSelect {...props} />)
};

const StyledSelect = styled.select`
  color: black;
  padding: 5px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: 1px solid ${props => props.theme.darkgray};
  margin: 5px;
`

export default Select;
