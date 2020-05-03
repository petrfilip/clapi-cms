import { route } from 'preact-router'
import PropTypes from 'prop-types'
import * as api from './../../api'
import DataLoader from '../data-loader'

import React from 'preact/compat'
import Table from '../table'

const headers = [
  { key: '_id', title: 'ID' },
  { key: 'metadata.collectionName', title: 'Collection' },
]

const CollectionList = (props) => {
  const onRowClick = (rowItem) =>
    (props.onRowClick && props.onRowClick(rowItem)) || route(`/edit/${rowItem.metadata.collectionName}/${rowItem._id}`)

  return (
    <DataLoader uri={api.fetchCollection('type-definition')}>
      {(typeDefinitions) => {
        console.log(typeDefinitions)
        return typeDefinitions.map((typeDefinition) => (
          <DataLoader uri={api.fetchCollection(typeDefinition.collectionName)}>
            {(data) => <Table headers={headers} rows={data} onRowClick={onRowClick} />}
          </DataLoader>
        ))
      }}
    </DataLoader>
  )
}

CollectionList.propType = {
  onRowClick: PropTypes.func,
}
export default CollectionList
