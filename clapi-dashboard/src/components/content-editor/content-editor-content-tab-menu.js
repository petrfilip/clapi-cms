import React from 'preact/compat'
import styled from 'styled-components'
import { useContext } from 'preact/hooks'
import { LayoutContext } from '../layout/layout-context'
import CollectionVersionList from '../collection-version-list/collection-version-list'

const ContentEditorContentTabMenu = () => {
  return (
    <Header>
      <Navigation>
        <StyledButton>Main</StyledButton>
        <StyledButton>SEO</StyledButton>
        <StyledButton>Rich Snippets</StyledButton>
      </Navigation>
    </Header>
  )
}

const Header = styled.header`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
  }
`

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledButton = styled.div`
  border: 1px solid gray;
  padding: 10px;
`

export default ContentEditorContentTabMenu
