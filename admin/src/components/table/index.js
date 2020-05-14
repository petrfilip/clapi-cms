import { route } from 'preact-router'
import PropTypes from 'prop-types'
import * as api from './../../api'
import DataLoader from '../data-loader'

import React from 'preact/compat'
import styled from 'styled-components'

const Table = ({ headers, rows, onRowClick }) => {
    return (
        <StyledTable>
            <HeaderRow>
                {headers.map((header) => (
                    <Cell>{header.title}</Cell>
                ))}
            </HeaderRow>
            {rows.map((row) => {
                return (
                    <Row onClick={() => onRowClick(row)}>
                        {headers.map((header) => (
                            <Cell>
                                {header.key
                                    .split('.')
                                    .reduce((o, i) => o[i], row)}
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
    cursor: pointer;
    font-weight: bold;
`

const Row = styled.div`
    display: flex; /* aligns all child elements (flex items) in a row */
    border-bottom: 1px dashed ${(props) => props.theme.gray};
    max-width: 100%;
    cursor: pointer;

    :hover {
        background-color: ${(props) => props.theme.gray};
    }
`

const Cell = styled.div`
    flex: 1; /* distributes space on the line equally among items */
    padding: 10px;
`

export default Table
