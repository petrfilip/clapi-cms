import style from './file-icon.css'

export const FileIcon = ({ file }) => {
    const fileType = file.attributes.mimeType.slice(
        file.attributes.mimeType.lastIndexOf('/') + 1
    )
    return <div className={style.file}>{fileType}</div>
}
