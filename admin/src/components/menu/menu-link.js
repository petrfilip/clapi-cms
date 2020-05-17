import { Link } from 'preact-router/match'
import { deviceSize } from '../responsive/responsive'
import styled from 'styled-components'
import React from 'preact/compat'

export const StyledLink = (props) => <LinkStyled {...props} />

const LinkStyled = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  border-bottom: 2px solid white;
  padding: 10px;
  margin: 10px;

  @media (max-width: ${deviceSize.tablet}) {
    :hover {
      background-color: white;
      color: black;
    }
  }
`
