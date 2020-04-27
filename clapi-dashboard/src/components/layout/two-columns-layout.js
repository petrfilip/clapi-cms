import React from "preact/compat";
import styled from "styled-components";

const TwoColumnsLayout = (props) => (
    <Parent className="parent">
      <Left className="left">{props.left}</Left>
      <Right className="right">{props.right}</Right>
    </Parent>
);



const Parent = styled.div`
  display: flex;
`

const Left = styled.div`
  overflow: auto;
  height: calc(100vh - 60px);
  flex: 1;
  border-right: 1px dashed gray;
`

const Right = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 60px);
  width: 350px;
`

export default TwoColumnsLayout;
