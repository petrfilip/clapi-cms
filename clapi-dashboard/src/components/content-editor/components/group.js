import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import ComponentEditWrapper from './component-edit-wrapper'
import Button from '../../elementary/button'

import React from 'preact/compat'
import styled from 'styled-components'

function renderInputs(config, editor, groupIndex) {
    return Object.entries(config).map(([key, value], i) => {
        value.onInputChangeCallback = (id, value) => {
            console.log(value)
            editor.setInputObject((currentState) => {
                currentState[groupIndex] = currentState[groupIndex] || []
                currentState[groupIndex][id] = value
                return [...currentState]
            })
            editor.onInputChangeCallback(editor.id, editor.inputObject)
        }
        value.initialValue =
            editor.inputObject &&
            editor.inputObject[groupIndex] &&
            editor.inputObject[groupIndex][key]
        value.id = key
        return h(ComponentEditWrapper, value)
    })
}

const Group = (props) => {
    const [inputObject, setInputObject] = useState(props.initialValue || [])
    //props.initialValue && setInputObject(props.initialValue)

    function remove(arrayData, index) {
        console.log(arrayData, index)
    }

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
                        <ActionButton>O</ActionButton>
                        <ActionButton
                            onClick={() =>
                                setInputObject((prevState) => {
                                    console.log(prevState)
                                    return prevState.filter(function (
                                        value,
                                        idx
                                    ) {
                                        return idx !== index
                                    })
                                })
                            }
                        >
                            R
                        </ActionButton>
                    </ActionButtons>
                    {renderInputs(
                        fields,
                        {
                            inputObject,
                            setInputObject,
                            onInputChangeCallback,
                            id,
                        },
                        index
                    )}
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
    text-align: right;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid red;
`

const ActionButton = styled.span`
    width: 10px;
    margin: 4px;
    text-align: center;
    font-size: 10px;
    border-radius: 2px;
`

export default Group
