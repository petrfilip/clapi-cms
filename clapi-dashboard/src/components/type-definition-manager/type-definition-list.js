import { h, React } from 'preact'
import { route } from 'preact-router'
import * as api from '../../api'
import DataLoader from '../data-loader'
import Table from '../table'

const headers = [{ key: 'collectionName', title: 'Collection' }]

const onRowClick = (rowItem) => {
    route('/definition-editor/' + rowItem.collectionName)
}

const TypeDefinitionList = () => {
    return (
        <DataLoader uri={api.fetchCollection('type-definition')}>
            {(data) => (
                <Table headers={headers} rows={data} onRowClick={onRowClick} />
            )}
        </DataLoader>
    )
}
export default TypeDefinitionList
