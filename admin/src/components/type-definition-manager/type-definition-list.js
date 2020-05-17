import { h, React } from 'preact'
import { route } from 'preact-router'
import * as api from '../../api'
import DataLoader from '../data-loader'
import Table from '../table'
import DataManager from '../data-loader/data-manager'
import Button from '../elementary/button'

const columns = [
  { key: 'metadata.collectionName', title: 'Collection' },
  {
    key: '_id',
    title: 'Delete',
    content: ({ _id, metadata }) => (
      <Button
        onClick={(e) => {
          DataManager.deleteRequest(api.deleteFromCollection('type-definition', _id))
          e.stopPropagation()
        }}
      >
        Delete
      </Button>
    ),
  },
]

const onRowClick = (rowItem) => {
  route('/admin/definition-editor/' + rowItem.metadata.collectionName)
}

const TypeDefinitionList = () => {
  return (
    <DataLoader uri={api.fetchCollection('type-definition')}>
      {(data) => <Table columns={columns} rows={data} onRowClick={onRowClick} />}
    </DataLoader>
  )
}
export default TypeDefinitionList
