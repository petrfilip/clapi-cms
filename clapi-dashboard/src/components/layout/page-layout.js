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
          <Content>{props.children}</Content>
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
  background: ${props => props.theme.gray}
  overflow: auto;
  display: block;
  height: calc(100vh - 60px);
`

export default PageLayout;
