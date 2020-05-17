import { h, React } from 'preact'
import style from './style.css'
import downloadIcon from './download.svg'
import { useState } from 'preact/hooks'
import * as api from '../../../api'
import { FilePreview } from '../file-preview/file-preview'
import { route } from 'preact-router'
import FileContextMenu from '../file-context-menu/file-context-menu'
import { formatBytes } from '../../../utils/string-utils'

export const Mode = {
  SELECT: 'SELECT',
  MULTI_SELECT: 'MULTI_SELECT',
  EDIT: 'EDIT',
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
              mode === Mode.EDIT && route('/admin/media/edit/' + file._id)
              props.onMediaClick && props.onMediaClick(file)
            }}
          >
            <div className={style.flexContainerInner}>
              <div className={style.bold}>{file.originName}</div>
              <div className={style.small}>{file.attributes.type}</div>
              <div className={style.small}>{formatBytes(file.attributes.size, 2)}</div>
            </div>
            <div>
              <FilePreview file={file} />
              <FileContextMenu file={file} config={props.configContextMenu} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default FileList
