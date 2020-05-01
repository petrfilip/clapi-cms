export const apiUrl = 'http://localhost:8888/'
const debug = '?XDEBUG_SESSION_START=PHPSTORM'

export const fetchCollection = (collectionName) => {
  return [apiUrl, 'collection/', collectionName, debug].join('')
}
export const fetchCollectionRevisions = (collectionName) => {
  return [apiUrl, 'collection/', collectionName, '-archiving', debug].join('')
}

export const fetchCollectionContent = (collectionName, id) => {
  return [apiUrl, 'collection/', collectionName, '/' + id, debug].join('')
}

export const fetchTypeDefinition = (collectionName) => {
  return [apiUrl, 'collection/', 'type-definition', '/' + collectionName, debug].join('')
}

export const fetchDownloadMediaFile = (mediaId) => {
  return [apiUrl, 'media/', 'download/', mediaId, debug].join('')
}

export const fetchMediaFile = () => {
  return [apiUrl, 'media/', 'file', debug].join('')
}

export const fetchMedia = (mediaId) => {
  return [apiUrl, 'media/', mediaId, debug].join('')
}

export const fetchMediaDirectory = () => {
  return [apiUrl, 'media/', 'directory', debug].join('')
}

export const fetchMediaList = (location) => {
  return [apiUrl, 'media/list', location, debug].join('')
}

export const fetchLogin = () => {
  return [apiUrl, 'login', debug].join('')
}
