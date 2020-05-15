import React from 'preact/compat'
import styled from 'styled-components'
import { deviceSize } from '../responsive/responsive'

export const Center = (props) => {
  return <CenterContent>{props.children}</CenterContent>
}

const CenterContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;

  @media (max-width: ${deviceSize.tablet}) {
    width: 100%;
  }
`
