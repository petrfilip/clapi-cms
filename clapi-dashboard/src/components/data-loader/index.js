import Loader from '../loader'
import { React } from 'preact'

import Error from '../error'
import DataManager from './data-manager'

const DataLoader = ({ uri, params, children, forceShowChild = false, skipLoader = false }) => {
    const [data, loading, error] = DataManager.load(uri, params)

    if (uri) {
        if (!skipLoader && loading) {
            return <Loader />
        }
        if (error) {
            return <Error error={error} />
        }
        if (!forceShowChild && !data) {
            return null
        }
    }
    return children(data)
}
export default DataLoader
