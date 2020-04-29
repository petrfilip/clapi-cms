import React from 'preact/compat'
import styled from 'styled-components'

const TypeDefinitionDropArea = ({ dataTransferKey, onDropEvent, children }) => {
    return (
        <DropContainer
            onDragOver={(event) => {
                event.preventDefault()
            }}
            onDrop={(e) => {
                const data = e.dataTransfer.getData(dataTransferKey)
                onDropEvent(data)
            }}
        >
            {children}
        </DropContainer>
    )
}
export default TypeDefinitionDropArea

const DropContainer = styled.div`
    padding: 10px;
    overflow: auto;
    text-align: center;
    font-size: 16px;
    background-color: bisque;
    margin-top: 5px;
    margin-bottom: 5px;
`
