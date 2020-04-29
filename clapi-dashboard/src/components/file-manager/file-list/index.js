import { h, React } from 'preact'
import style from './style.css'
import downloadIcon from './download.svg'
import { useState } from 'preact/hooks'
import * as api from '../../../api'
import { FilePreview } from '../file-preview/file-preview'
import { route } from 'preact-router'

export const Mode = {
    SELECT: 'SELECT',
    MULTI_SELECT: 'MULTI_SELECT',
    EDIT: 'EDIT',
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0 Bytes'
    }

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const FileList = (props) => {
    const defaultMode = props.fileListMode || Mode.EDIT
    const defaultSelected = props.selectedItem || (defaultMode === Mode.MULTI_SELECT && []) || {}
    const [mode, setMode] = useState(defaultMode)
    const [selected, setSelected] = useState(defaultSelected)

    return (
        <div className={style.flexContainer}>
            {props.files.map((file, index) => {
                return (
                    <div
                        className={mode === Mode.SELECT && file._id === selected._id && style.selected}
                        onClick={() => {
                            mode === Mode.SELECT && setSelected(file)
                            mode === Mode.MULTI_SELECT && setSelected([...selected, file])
                            mode === Mode.EDIT && route('/media/edit/' + file._id)
                            props.onMediaClick && props.onMediaClick(file)
                        }}
                    >
                        <div className={style.flexContainerInner}>
                            <div className={style.bold}>{file.originName}</div>
                            <div className={style.small}>{file.attributes.type}</div>
                            <div className={style.small}>{formatBytes(file.attributes.size, 2)}</div>
                            <div className={style.downloadIcon}>
                                <img src={downloadIcon} alt={'download file'} />
                            </div>
                        </div>
                        <div>
                            <FilePreview file={file} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default FileList
