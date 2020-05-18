import DataLoader from '../../components/data-loader'
import * as api from '../../api'
import Table from '../../components/table'
import React from 'preact/compat'
import ImageConfiguration from '../../components/configuration-manager/image-configuration'

const columns = [
  { key: 'key', title: 'Key' },
  { key: 'current', title: 'Current' },
  { key: 'required', title: 'Required' },
  { key: 'status', title: 'Status' },
  { key: 'description', title: 'Description' },
]

const SettingsPage = () => {
  return (
    <div>
      <h1>Image config</h1>
      <ImageConfiguration />
      <h1>Users</h1>
      <h1>Requirements</h1>
      <DataLoader uri={api.fetchInitRequirements()}>{(data) => <Table columns={columns} rows={data} />}</DataLoader>
    </div>
  )
}

export default SettingsPage
