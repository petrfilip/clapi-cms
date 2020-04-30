import { h, React } from 'preact'
import { route } from 'preact-router'
import * as api from '../../api'
import DataLoader from '../data-loader'
import { useContext, useEffect } from 'preact/hooks'
import { LayoutContext } from '../menu/layout-context'

function renderList(data) {
    const { setActionSidebar } = useContext(LayoutContext)

    return (
        <div>
            {data.map((item, i) => (
                <div
                    onClick={() => {
                        setActionSidebar(null)
                        route('/edit/' + item.collectionName + '/')
                    }}
                >
                    {item.collectionName}
                </div>
            ))}
        </div>
    )
}

const DocumentTypeList = () => {
    return (
        <DataLoader uri={api.fetchCollection('type-definition')}>
            {(data) => renderList(data)}
        </DataLoader>
    )
}
export default DocumentTypeList
