import { route } from 'preact-router'
import PropTypes from 'prop-types'
import * as api from './../../api'
import DataLoader from '../data-loader'

import React from 'preact/compat'
import Table from '../table'
import DataManager from '../data-loader/data-manager'
import Button from '../elementary/button'

const columns = [
  { key: 'data.main.title', title: 'Title' },
  { key: 'sys.created', title: 'Created' },
  { key: 'metadata.collectionName', title: 'Collection' },
  { key: '_id', title: 'ID' },
  {
    key: '_id',
    title: 'Delete',
    content: ({ _id, metadata }) => (
      <Button
        onClick={(e) => {
          DataManager.deleteRequest(api.deleteFromCollection(metadata.collectionName, _id))
          e.stopPropagation()
        }}
      >
        Delete
      </Button>
    ),
  },
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
        return typeDefinitions.map((typeDefinition) => (
          <DataLoader uri={api.fetchCollection(typeDefinition.metadata.collectionName)}>
            {(data) => <Table columns={columns} rows={data} onRowClick={onRowClickHandler} />}
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
