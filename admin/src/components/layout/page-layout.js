import React from 'preact/compat'
import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { LayoutContext } from './layout-context'
import Menu from '../menu'
import TwoColumnsLayout from './two-columns-layout'

const PageLayout = (props) => {
  const [menu, setMenu] = useState(null)
  const [sidebar, setSidebar] = useState(null)
  const [actionSidebar, setActionSidebar] = useState(null)

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      setActionSidebar(null)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)
    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  useEffect(() => {
    return () => {
      setActionSidebar(null)
    }
  }, [])

  /* MENU CONTEXT */
  const menuValue = {
    menu,
    setMenu,
    sidebar,
    setSidebar,
    actionSidebar,
    setActionSidebar,
  }

  return (
    <LayoutContext.Provider value={menuValue}>
      <Parent>
        <Top>
          <Menu />
        </Top>
        <Content>
          <TwoColumnsLayout>{props.children}</TwoColumnsLayout>
        </Content>
      </Parent>
    </LayoutContext.Provider>
  )
}

const Parent = styled.div``

const Top = styled.div`
  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme.primary};
  border-bottom: 1px solid ${(props) => props.theme.gray};
  height: 60px;
`

const Content = styled.div`
  background-color: ${(props) => props.theme.lightgray};
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  height: calc(100vh - 60px);
`

export default PageLayout
