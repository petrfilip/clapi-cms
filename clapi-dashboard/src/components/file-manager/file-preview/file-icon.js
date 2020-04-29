import style from './file-icon.css'

export const FileIcon = ({ file }) => {
    const mimeType = file.attributes.type
    const fileType = mimeType.slice(mimeType.lastIndexOf('/') + 1)
    return <div className={style.file}>{fileType}</div>
}
