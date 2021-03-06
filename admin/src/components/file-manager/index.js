import { React } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import FileList from './file-list'
import DirectoryList from './directory-list'
import FileUpload from './file-upload'
import DirectoryCreate from './directory-create'
import { route } from 'preact-router'
import PropTypes from 'prop-types'
import * as api from '../../api'
import DataManager from '../data-loader/data-manager'
import Loader from '../loader'
import downloadIcon from './file-list/download.svg'

function normalizeLocation(location) {
  return location || '/'
}

function detectRouteChange(location, propsLocation, setLocation) {
  if (normalizeLocation(location) !== normalizeLocation(propsLocation)) {
    setLocation(normalizeLocation(propsLocation))
  }
}

function removeLastDirectory(path) {
  const the_arr = path.split('/')
  the_arr.pop()

  if (the_arr.length <= 1) {
    return '/'
  }

  return the_arr.join('/')
}

const FileManager = (props) => {
  const [location, setLocation] = useState(normalizeLocation(props.location))
  const [data, loading, error, setData] = DataManager.load(api.fetchMediaList(location), props.params)

  const onDirectoryClick = (location) => {
    location = normalizeLocation(location)
    setLocation(location)
    props.routeAllowed && route('/admin/media' + location)
  }

  const onBackDirectoryClick = () => {
    let newLocation = normalizeLocation(location)
    newLocation = removeLastDirectory(newLocation)
    setLocation(newLocation)
    props.routeAllowed && route('/admin/media' + newLocation)
  }

  const onNewDirectory = (directory) => {
    const addedDir = Object.assign({}, data)
    addedDir.directories.push(directory)
    setData(addedDir)
  }

  const onNewFile = (files) => {
    const addedFilesData = Object.assign({}, data)
    files.map((item) => {
      addedFilesData.files.push(item)
    })
    setData(addedFilesData)
  }

  const onDeleteFile = (file) => {
    const newData = Object.assign({}, data)
    newData.files = data.files.filter((item) => item._id !== file._id)
    DataManager.deleteRequest(api.fetchMedia(file._id))
    setData(newData)
  }

  const configContextMenu = [
    {
      icon: downloadIcon,
      alt: 'Download',
      onClick: (item) => alert('Download clicked: ' + item._id),
    },
    {
      icon: downloadIcon,
      alt: 'Delete',
      onClick: (item) => onDeleteFile(item),
    },
  ]

  useEffect(() => {
    props.routeAllowed && detectRouteChange(location, props.location, setLocation)
  }, [props.location, location])

  return (
    <div>
      <h2>Current location: {location}</h2>
      <DirectoryCreate callback={onNewDirectory} currentLocation={location} />
      <FileUpload callback={onNewFile} currentLocation={location} />
      {(loading && <Loader />) || (
        <>
          <DirectoryList
            currentLocation={location}
            onBackDirectoryClick={onBackDirectoryClick}
            onDirectoryClick={onDirectoryClick}
            directories={(data && data.directories) || []}
          />
          <hr />
          <FileList
            selectedItem={props.selectedItem}
            fileListMode={props.fileListMode}
            onMediaClick={props.onMediaClick}
            files={(data && data.files) || []}
            configContextMenu={configContextMenu}
          />
        </>
      )}
    </div>
  )
}

FileManager.propTypes = {
  routeAllowed: PropTypes.bool,
  location: PropTypes.string,
}

export default FileManager
