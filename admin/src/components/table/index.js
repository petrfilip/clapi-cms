import Button from '../elementary/button'
import { useState } from 'preact/hooks'
import React from 'preact/compat'
import styled from 'styled-components'

const Table = ({ columns, rows, onRowClick, onSave }) => {
  const [rowsData, setRowsData] = useState(rows || [])

  return (
    <StyledTable>
      <HeaderRow>
        {columns.map((header) => (
          <Cell>{header.title}</Cell>
        ))}
      </HeaderRow>
      {rowsData &&
        rowsData.map((row, rowIndex) => {
          return (
            <Row
              isOnRowClickDefined={onRowClick}
              onClick={() => {
                onRowClick && onRowClick(row)
              }}
            >
              {columns.map((column) => {
                const newRow = Object.assign({}, row)
                newRow.onInput = (event) => {
                  const newRowsData = Object.assign([], rowsData)
                  newRowsData[rowIndex][column.key] = event.target.value
                  setRowsData(newRowsData)
                }

                newRow.removeRow = () => {
                  const newRowsData = rowsData.filter((item, index) => index !== rowIndex)
                  setRowsData(newRowsData)
                }

                return (
                  <Cell>
                    {(column.content && column.content(newRow)) ||
                      column.key.split('.').reduce((o, i) => o && o[i], row)}
                  </Cell>
                )
              })}
            </Row>
          )
        })}
      {onSave && (
        <>
          <Button
            onClick={() => {
              const newRowsData = Object.assign([], rowsData)
              newRowsData.push({})
              setRowsData(newRowsData)
            }}
          >
            {' '}
            Add new
          </Button>
          <Button onClick={() => onSave(rowsData)}>Save</Button>
          <Button>Cancel</Button>
        </>
      )}
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
