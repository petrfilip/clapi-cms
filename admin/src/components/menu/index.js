import { Link } from 'preact-router/match'
import style from './style.css'
import UserManager from '../user-manager'

import React from 'preact/compat'
import styled from 'styled-components'
import { useContext, useEffect, useState } from 'preact/hooks'
import { LayoutContext } from '../layout/layout-context'
import { route } from 'preact-router'
import { deviceSize } from '../responsive/responsive'
import { StyledLink } from './menu-link'

function getNavForLoggedUser(closeMenu) {
  return (
    <>
      <StyledLink onClick={() => closeMenu()} activeClassName={style.active} href="/admin/entries">
        Home
      </StyledLink>
      <StyledLink onClick={() => closeMenu()} activeClassName={style.active} href="/admin/media">
        Media
      </StyledLink>
      <StyledLink onClick={() => closeMenu()} activeClassName={style.active} href="/admin/definition-editor">
        Definition editor
      </StyledLink>
      <StyledLink onClick={() => closeMenu()} activeClassName={style.active} href="/admin/settings">
        Settings
      </StyledLink>
      <StyledLink onClick={() => closeMenu()} activeClassName={style.active} href="/admin/logout">
        Logout
      </StyledLink>
    </>
  )
}

const Menu = ({ currentUrl }) => {
  const { menu } = useContext(LayoutContext)
  const [isOpen, setIsOpen] = useState(false)

  const menuWithBackButton = <>{menu}</>

  const toggleOpen = (isOpen) => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <Header>
      <Title>Clapi CMS </Title>
      <ResponsiveMenuHamburger onClick={() => toggleOpen(isOpen)}>Menu</ResponsiveMenuHamburger>

      <Navigation isOpen={isOpen}>
        {(menu && menuWithBackButton) || (UserManager.getUserDetails() && getNavForLoggedUser(closeMenu))}
      </Navigation>
    </Header>
  )
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  & > * {
  }
`

const Title = styled.h1`
  margin: 10px;
`
const ResponsiveMenuHamburger = styled.div`
  display: none;

  @media (max-width: ${deviceSize.tablet}) {
    display: block;
  }
`

const Navigation = styled.nav`
  z-index: 199;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${deviceSize.tablet}) {
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    flex-wrap: wrap;
    background-color: #0072bb;
    color: #888888;
    width: 100%;
  }
`

export default Menu
