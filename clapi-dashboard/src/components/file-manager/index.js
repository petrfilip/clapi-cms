import {h, React} from 'preact';
import {useEffect, useState} from "preact/hooks";
import FileList from "./file-list";
import DirectoryList from "./directory-list";
import FileUpload from "./file-upload";
import DirectoryCreate from "./directory-create";
import {route} from "preact-router";
import PropTypes from 'prop-types';
import * as api from "../../api";
import DataLoader from "../data-loader";

function normalizeLocation(location) {
  return location || "/";
}

function detectRouteChange(location, props, setLocation) {
  if (normalizeLocation(location) !== normalizeLocation(props.location)) {
    setLocation(normalizeLocation(props.location));
  }
}

function removeLastDirectory(path) {
  const the_arr = path.split('/');
  the_arr.pop();

  if (the_arr.length <= 1) {
    return '/';
  }

  return (the_arr.join('/'));
}

const FileManager = (props) => {
  const [location, setLocation] = useState(normalizeLocation(props.location));


  props.routeAllowed && detectRouteChange(location, props, setLocation);

  const onDirectoryClick = (location) => {
    location = normalizeLocation(location);
    setLocation(location)
    props.routeAllowed && route('/media' + location)
  };

  const onBackDirectoryClick = () => {
    let newLocation = normalizeLocation(location);
    newLocation = removeLastDirectory(newLocation);
    setLocation(newLocation)
    props.routeAllowed && route('/media' + newLocation)
  };

  const onNewDirectory = (data) => {
    setLocation("/hackToReloadItems");
  }

  const onNewFile = (data) => {
    setLocation("/hackToReloadItems");
  }

  return (
      <div>
        <br/>
        <br/>
        <br/>
        <h2>Current location: {location}</h2>
        <DirectoryCreate callback={onNewDirectory} currentLocation={location}/>
        <FileUpload callback={onNewFile} currentLocation={location}/>

        <DataLoader uri={api.fetchMediaList(location)}>
          {(data) => (
              <>

                <DirectoryList currentLocation={location}
                               onBackDirectoryClick={onBackDirectoryClick}
                               onDirectoryClick={onDirectoryClick}
                               directories={data.directories || []}/>
                <hr/>
                <FileList selectedItem={props.selectedItem}
                          fileListMode={props.fileListMode}
                          onMediaClick={props.onMediaClick}
                          files={data.files || []}/>
              </>
          )}
        </DataLoader>
      </div>
  );
};

FileManager.propTypes = {
  routeAllowed: PropTypes.bool,
  location: PropTypes.string
}


export default FileManager;
