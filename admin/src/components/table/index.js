import { route } from 'preact-router'
import PropTypes from 'prop-types'
import * as api from './../../api'
import DataLoader from '../data-loader'

import React from 'preact/compat'
import styled from 'styled-components'

export const TableMode = ['VIEW', 'EDIT']

const Table = ({ columns, rows, onRowClick }) => {
  return (
    <StyledTable>
      <HeaderRow>
        {columns.map((header) => (
          <Cell>{header.title}</Cell>
        ))}
      </HeaderRow>
      {rows.map((row) => {
        return (
          <Row
            isOnRowClickDefined={onRowClick}
            onClick={() => {
              onRowClick && onRowClick(row)
            }}
          >
            {columns.map((column) => (
              <Cell>
                {(column.content && column.content(row)) || column.key.split('.').reduce((o, i) => o[i], row)}
              </Cell>
            ))}
          </Row>
        )
      })}
    </StyledTable>
  )
}

const StyledTable = styled.div`
  padding: 5px;
  border-radius: 5px;
  width: 100%;
`

const HeaderRow = styled.div`
  display: flex; /* aligns all child elements (flex items) in a row */
  border-bottom: 1px dashed ${(props) => props.theme.gray};
  max-width: 100%;
  cursor: default;
  font-weight: bold;
`

const Row = styled.div`
  display: flex; /* aligns all child elements (flex items) in a row */
  border-bottom: 1px dashed ${(props) => props.theme.gray};
  max-width: 100%;
  cursor: ${(props) => (props.isOnRowClickDefined && 'pointer') || 'default'};
  align-items: baseline;

  :hover {
    background-color: ${(props) => props.isOnRowClickDefined && props.theme.gray};
  }
`

const Cell = styled.div`
  z-index: 99;
  flex: 1; /* distributes space on the line equally among items */
  padding: 10px;
`

export default Table
