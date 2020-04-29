import { h, React } from 'preact'
import style from './style'
import FileManager from '../../components/file-manager'
import { FileEditor } from '../../components/file-editor/file-editor'

const MediaPage = (props) => {
    return props.id ? <FileEditor fileId={props.id} /> : <FileManager routeAllowed={true} location={'/' + props.location} />
}

export default MediaPage
