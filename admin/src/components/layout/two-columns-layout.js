import React from 'preact/compat'
import styled from 'styled-components'
import { Center } from './center'
import { useContext } from 'preact/hooks'
import { LayoutContext } from './layout-context'
import { deviceSize } from '../responsive/responsive'

const TwoColumnsLayout = ({ children }) => {
  const { sidebar, actionSidebar } = useContext(LayoutContext)

  return (
    <Parent>
      <Left>
        <Center>{children}</Center>
      </Left>
      {(actionSidebar && (
        <Right isActionSidebarActive={actionSidebar}>
          <ResponsiveCloseButton
            onClick={() => {
              console.log('click')
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
            }}
          >
            Close
          </ResponsiveCloseButton>
          {actionSidebar}
        </Right>
      )) ||
        (sidebar && <Right>{sidebar}</Right>)}
    </Parent>
  )
}

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

  @media (max-width: ${deviceSize.tablet}) {
    width: ${(props) => (props.isActionSidebarActive ? '100%' : '0')};
  }
`
const ResponsiveCloseButton = styled.div`
  position: fixed;
  display: none;
  @media (max-width: ${deviceSize.tablet}) {
    display: block;
    width: 100%;
    background-color: red;
  }
`
export default TwoColumnsLayout
