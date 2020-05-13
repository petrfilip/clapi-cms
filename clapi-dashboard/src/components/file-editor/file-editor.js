import { FilePreview } from '../file-manager/file-preview/file-preview'
import { React } from 'preact'
import { InputWrapper } from './input-wrapper'
import DataLoader from '../data-loader'
import * as api from '../../api'
import { useState } from 'preact/hooks'
import DataManager from '../data-loader/data-manager'
import { route } from 'preact-router'
import Button from '../elementary/button'

function fields(file, setFile) {
  return (
    <>
      <FilePreview file={file} />
      <InputWrapper label={'Description'}>
        <textarea
          value={file.description}
          onInput={(e) => {
            file.description = e.target.value
            setFile(file)
          }}
        />
      </InputWrapper>
      <Button
        onClick={(e) => {
          e.preventDefault()
          DataManager.saveOrUpdate(api.fetchMediaFile(), 'json', file, (data) => {
            route('/admin/media' + data.path)
          })
        }}
      >
        Update changes
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault()
          route('/admin/media' + file.path)
        }}
      >
        Back
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault()
          DataManager.fetchBinaryData(api.fetchDownloadMediaFile(file._id))
        }}
      >
        Download
      </Button>
    </>
  )
}

export const FileEditor = ({ fileId }) => {
  const [file, setFile] = useState()

  return (
    <DataLoader uri={api.fetchMedia(fileId)}>
      {(data) => {
        setFile(data)
        return file && fields(file, setFile)
      }}
    </DataLoader>
  )
}
