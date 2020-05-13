import { h, React } from 'preact'
import { route } from 'preact-router'
import * as api from '../../api'
import DataLoader from '../data-loader'
import { LayoutContext } from '../layout/layout-context'
import Table from '../table'
import { useContext } from 'preact/hooks'

const onRowClick = (item) => {
  route('/admin/edit/' + item.metadata.collectionName + '/')
}

const headers = [{ key: 'metadata.collectionName', title: 'Collection' }]

const DocumentTypeList = () => {
  const { setActionSidebar } = useContext(LayoutContext)

  return (
    <DataLoader uri={api.fetchCollection('type-definition')}>
      {(data) => (
        <Table
          headers={headers}
          rows={data}
          onRowClick={(rowItem) => {
            onRowClick(rowItem)
            setActionSidebar(null)
          }}
        />
      )}
    </DataLoader>
  )
}
export default DocumentTypeList
