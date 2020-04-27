import {h} from 'preact';
import {ContentEditorComponents} from "../content-editor-components";

import React from "preact/compat";
import styled from "styled-components";


const ComponentEditWrapper = (props) => (
    <ComponentWrapper>
      <Label>
        {props.config.label} | <ApiKey>{props.id}</ApiKey>
      </Label>
      {h(ContentEditorComponents[props.type], props)}
    </ComponentWrapper>
);

const ComponentWrapper = styled.div`
  background-color: white;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 20px;
`
const Label = styled.div`
  display: block;
  font-size: 12px;
  margin-left: 10px;
  padding: 5px;
`
const ApiKey = styled.span`
  font-size: 10px;
`

export default ComponentEditWrapper;
