import {Link} from 'preact-router/match';
import style from './style.css';
import UserManager from "../user-manager";

import React from "preact/compat";
import styled from "styled-components";
import {useContext} from "preact/hooks";
import {AppModalContext} from "../modal/AppModalContextProvider";
import {MenuContext} from "./menu-context";
import {route} from "preact-router";

function getNavForLoggedUser() {
  return <>
    <Link activeClassName={style.active} href="/">Home</Link>
    <Link activeClassName={style.active} href="/media">Media</Link>
    <Link activeClassName={style.active} href="/definition-editor">Definition
      editor</Link>
    <Link activeClassName={style.active} href="/logout">Logout</Link>
  </>;
}

const Menu = () => {
  const {menuContext} = useContext(MenuContext)

  const menuContextWithBackButton = (<>
    <a onClick={()=> route("/")}>Home</a>
    {menuContext}
    </>)

  return (
      <Header>
        <Title>Preact App</Title>
        <Navigation>
          {menuContext && menuContextWithBackButton ||
          (UserManager.getUserDetails() && getNavForLoggedUser())}
        </Navigation>
      </Header>
  )
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
  }
`

const Title = styled.h1`
  margin: 10px;
`

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > a {
    color: white;
    text-decoration: none;
    border-bottom: 2px solid white;
    padding: 10px;
    margin: 10px;
  }
`

export default Menu;
