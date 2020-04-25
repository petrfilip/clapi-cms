import {h, React} from 'preact';
import style from './style';
import FileManager from "../../components/file-manager";

const Media = (props) => {
  return (
      <FileManager routeAllowed={true} location={props.path}/>
  )
};

export default Media;
