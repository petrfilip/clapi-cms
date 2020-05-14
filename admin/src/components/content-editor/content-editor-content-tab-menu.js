import React from 'preact/compat'
import styled from 'styled-components'

const ContentEditorContentTabMenu = ({ tabs, onTabClick }) => {
  return (
    <Header>
      <Navigation>
        {tabs.map((item) => {
          return <StyledButton onClick={() => onTabClick(item.key)}>{item.label}</StyledButton>
        })}
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
