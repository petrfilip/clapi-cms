import style from '../file-list/style.css'
import * as api from '../../../api'
import { React } from 'preact'
import { FileIcon } from './file-icon'
import { SystemImageSize } from '../../responsive/responsive'

export const FilePreview = ({ file, size }) => {
  const imageSize = size ? size : SystemImageSize.MEDIUM
  if (!file) {
    return
  }

  const hasPreview = file.attributes.mimeType.substring(0, 5) === 'image' // todo more complicated when pdf converts to image

  return hasPreview ? (
    <img
      className={style.filePreview}
      src={api.apiUrl + 'media/show/' + file._id + '/' + imageSize}
      alt={file.originName}
    />
  ) : (
    <FileIcon file={file} />
  )
}
