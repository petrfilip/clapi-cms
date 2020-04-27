import {route} from 'preact-router';
import PropTypes from 'prop-types';
import * as api from './../../api'
import DataLoader from "../data-loader";

import React from "preact/compat";
import styled from "styled-components";

const CollectionList = (props) => {
  //todo list over all
  return (
      <>
        <DataLoader uri={api.fetchCollection("novinky")}>
          {data => renderList(data, props.onRowClick)}
        </DataLoader>
      </>
  );
};

function renderList(data, onRowClick) {
  onRowClick = onRowClick || ((value) => route(
      `/edit/${value.metadata.collectionName}/${value._id}`))
  return <>
    <Table>
      <HeaderRow>
        <Cell>id</Cell>
        <Cell>uid</Cell>
        <Cell>Text</Cell>
      </HeaderRow>
      {data.map((value, index) => {
            return (
                <Row onClick={() => onRowClick(value)}>
                  <Cell>{value._id}</Cell>
                  <Cell>{value._id}</Cell>
                  <Cell>{value.metadata.collectionName}</Cell>
                </Row>
            )
          }
      )}
    </Table>

  </>;
}

const Table = styled.div`
  padding: 5px;
  border-radius: 5px;
  width: 500px;
`

const HeaderRow = styled.div`
  display: flex;  /* aligns all child elements (flex items) in a row */
  border-bottom: 1px dashed ${props => props.theme.gray};
  max-width: 100%;
  cursor: pointer;
  font-weight: bold;
`

const Row = styled.div`
  display: flex;  /* aligns all child elements (flex items) in a row */
  border-bottom: 1px dashed ${props => props.theme.gray};
  max-width: 100%;
  cursor: pointer;
  
  :hover {
    background-color: ${props => props.theme.gray};
  }
  
`

const Cell = styled.div`
  flex: 1;        /* distributes space on the line equally among items */
  padding: 10px;
`

CollectionList.propType = {
  onRowClick: PropTypes.func
}
export default CollectionList;