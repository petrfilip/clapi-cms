import React from 'preact/compat'
import styled from 'styled-components'
import { Center } from './center'
import { useContext } from 'preact/hooks'
import { LayoutContext } from '../menu/layout-context'

const TwoColumnsLayout = ({ children }) => {
    const { sidebar, actionSidebar } = useContext(LayoutContext)

    return (
        <Parent>
            <Left>
                <Center>{children}</Center>
            </Left>
            {(actionSidebar && <Right>{actionSidebar}</Right>) || (sidebar && <Right className="right">{sidebar}</Right>)}
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
`

export default TwoColumnsLayout
