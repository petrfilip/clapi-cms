import React from 'preact/compat'
import styled from 'styled-components'
import Input from '../elementary/input'
import { useState } from 'preact/hooks'

const TypeDefinitionBuilderTabMenu = ({ tabs, currentActiveTab, onTabClick, onNewTab }) => {
  const [newTab, setNewTab] = useState(null)

  return (
    <Header>
      <Navigation>
        {tabs.map((item) => {
          return <StyledButton onClick={() => onTabClick(item.key)}>{item.label}</StyledButton>
        })}
        {onNewTab && (
          <>
            <StyledButton
              disabled={newTab}
              onClick={() => {
                onNewTab(newTab)
                setNewTab(null)
              }}
            >
              +
            </StyledButton>
            <Input value={newTab} onInput={(e) => setNewTab(e.target.value)} />
          </>
        )}
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

export default TypeDefinitionBuilderTabMenu
