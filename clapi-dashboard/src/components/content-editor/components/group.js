import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import ComponentEditWrapper from './component-edit-wrapper'
import Button from '../../elementary/button'

import React from 'preact/compat'
import styled from 'styled-components'

function renderInputs(config, editor, groupIndex) {
    return Object.entries(config).map(([key, value], i) => {
        value.onInputChangeCallback = (id, value) => {
            editor.setInputObject((currentState) => {
                currentState[groupIndex] = currentState[groupIndex] || {}
                currentState[groupIndex][id] = value
                return { ...currentState }
            })
            editor.onInputChangeCallback(editor.id, editor.inputObject)
        }
        value.initialValue = editor.inputObject && editor.inputObject[groupIndex] && editor.inputObject[groupIndex][key]
        value.id = key
        return h(ComponentEditWrapper, value)
    })
}

const Group = (props) => {
    const [inputObject, setInputObject] = useState(props.initialValue || [])
    //props.initialValue && setInputObject(props.initialValue)

    useEffect(() => {
        setInputObject(props.initialValue || [])
    }, [props.initialValue])

    const { fields } = props.config
    const { id, onInputChangeCallback } = props
    return (
        <StyleGroupWrapper>
            {Object.keys(inputObject).map((element, index) => (
                <GroupItem key={index}>
                    <ActionButtons>
                        <span>reorder</span>
                        <span>remove</span>
                    </ActionButtons>
                    {renderInputs(fields, { inputObject, setInputObject, onInputChangeCallback, id }, index)}
                </GroupItem>
            ))}
            <Button
                onClick={() => {
                    setInputObject((prevState) => [...prevState, {}])
                }}
            >
                Add new element
            </Button>
        </StyleGroupWrapper>
    )
}

const StyleGroupWrapper = styled.div`
    background-color: ${(props) => props.theme.lightgray};
    margin: 10px;
    padding: 10px;
`

const GroupItem = styled.div`
    border-top: 1px dashed gray;
    padding: 10px;
`

const ActionButtons = styled.div`
    float: right;
    background-color: white;
    width: 100px;
    text-align: right;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid red;
`

export default Group
