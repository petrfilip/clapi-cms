import { useContext } from 'preact/hooks'
import { FlashMessageContext } from './flash-message-context'
import style from './style.css'

import React from 'preact/compat'
import styled from 'styled-components'

const FlashMessages = (props) => {
    const { removeMessage } = useContext(FlashMessageContext)

    return (
        props.messages.length > 0 && (
            <Messages>
                {props.messages.map((item, index) => (
                    <Message type={item.type} onClick={() => removeMessage(index)} className={style[item.type]}>
                        <CloseButton>&times;</CloseButton>
                        {item.message}
                    </Message>
                ))}
            </Messages>
        )
    )
}

const Messages = styled.div`
    margin-left: -125px;
    text-align: center;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
`

const Message = styled.div`
    margin: 5px;
    min-width: 250px;
    border-radius: 2px;
    padding: 16px;
`

const CloseButton = styled.span`
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        color: black;
    }
`

export default FlashMessages
