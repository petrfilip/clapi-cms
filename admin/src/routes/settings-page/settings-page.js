import DataLoader from '../../components/data-loader'
import * as api from '../../api'
import Table from '../../components/table'
import React from 'preact/compat'
import ImageConfiguration from '../../components/configuration-manager/image-configuration'
import Tab from '../../components/tab/tab'
import { useDocumentTitle } from '../../components/layout/window-title'

const columns = [
  { key: 'key', title: 'Key' },
  { key: 'current', title: 'Current' },
  { key: 'required', title: 'Required' },
  { key: 'status', title: 'Status' },
  { key: 'description', title: 'Description' },
]

const data = [
  { id: '0', tabTitle: 'System information', tabContent: 'TODO clear cache' },
  { id: '1', tabTitle: 'Image config', tabContent: <ImageConfiguration /> },
  { id: '2', tabTitle: 'Users', tabContent: 'TODO' },
  {
    id: '3',
    tabTitle: 'System Requirements',
    tabContent: (
      <DataLoader uri={api.fetchInitRequirements()}>{(data) => <Table columns={columns} rows={data} />}</DataLoader>
    ),
  },
]

const SettingsPage = () => {
  useDocumentTitle('Settings')

  return <Tab config={data} />
}

export default SettingsPage
