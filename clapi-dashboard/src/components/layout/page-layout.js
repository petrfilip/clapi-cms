import React from "preact/compat";
import styled from "styled-components";
import {useState} from "preact/hooks";
import {MenuContext} from "../menu/menu-context";

const PageLayout = (props) => {
  const [menuContext, setMenuContext] = useState(null);

  /* MENU CONTEXT */
  const menuContextValue = {
    menuContext: menuContext,
    setMenuContext: setMenuContext
  };

  return (
      <MenuContext.Provider value={menuContextValue}>
        <Parent>
          <Top>{props.menu}</Top>
          <Content>
            {props.children}
          </Content>
        </Parent>
      </MenuContext.Provider>
  )
};

const Parent = styled.div`
`

const Top = styled.div`
  color: ${props => props.theme.white};
  background: ${props => props.theme.primary} ;
  border-bottom: 1px solid ${props => props.theme.gray};
  height: 60px;
`

const Content = styled.div`
  background-color: ${props => props.theme.lightgray};
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  height: calc(100vh - 60px);
`

const Center = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`

export default PageLayout;
