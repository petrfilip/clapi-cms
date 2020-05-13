import { Link } from 'preact-router/match'
import style from './style.css'
import UserManager from '../user-manager'

import React from 'preact/compat'
import styled from 'styled-components'
import { useContext } from 'preact/hooks'
import { LayoutContext } from '../layout/layout-context'
import { route } from 'preact-router'

function getNavForLoggedUser() {
  return (
    <>
      <Link activeClassName={style.active} href="/admin/">
        Home
      </Link>
      <Link activeClassName={style.active} href="/admin/media">
        Media
      </Link>
      <Link activeClassName={style.active} href="/admin/definition-editor">
        Definition editor
      </Link>
      <Link activeClassName={style.active} href="/admin/settings">
        Settings
      </Link>
      <Link activeClassName={style.active} href="/admin/logout">
        Logout
      </Link>
    </>
  )
}

const Menu = () => {
  const { menu } = useContext(LayoutContext)

  const menuWithBackButton = (
    <>
      <a onClick={() => route('/admin/')}>Home</a>
      {menu}
    </>
  )

  return (
    <Header>
      <Title>Clapi CMS </Title>
      <Navigation>{(menu && menuWithBackButton) || (UserManager.getUserDetails() && getNavForLoggedUser())}</Navigation>
    </Header>
  )
}

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

export default Menu
