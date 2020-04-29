import style from '../file-list/style.css'
import * as api from '../../../api'
import { React } from 'preact'
import { FileIcon } from './file-icon'

export const FilePreview = ({ file }) => {
    if (!file) {
        return
    }

    const hasPreview = file.attributes.type.substring(0, 5) === 'image' // todo more complicated when pdf converts to image

    return hasPreview ? <img className={style.filePreview} src={api.apiUrl + file.publicPath} alt={file.originName} /> : <FileIcon file={file} />
}
