import { route } from 'preact-router'
import PropTypes from 'prop-types'
import * as api from './../../api'
import DataLoader from '../data-loader'

import React from 'preact/compat'
import Table from '../table'

const headers = [
  { key: 'data.main.title', title: 'Title' },
  { key: 'sys.created', title: 'Created' },
  { key: 'metadata.collectionName', title: 'Collection' },
  { key: '_id', title: 'ID' },
]

const CollectionList = ({ onRowClick }) => {
  const onRowClickHandler = (rowItem) => {
    if (onRowClick) {
      onRowClick(rowItem)
    } else {
      route(`/admin/edit/${rowItem.metadata.collectionName}/${rowItem._id}`)
    }
  }

  return (
    <DataLoader uri={api.fetchCollection('type-definition')}>
      {(typeDefinitions) => {
        console.log(typeDefinitions)
        return typeDefinitions.map((typeDefinition) => (
          <DataLoader uri={api.fetchCollection(typeDefinition.metadata.collectionName)}>
            {(data) => <Table headers={headers} rows={data} onRowClick={onRowClickHandler} />}
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
