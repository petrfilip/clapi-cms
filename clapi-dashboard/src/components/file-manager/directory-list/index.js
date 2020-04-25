import {h, React} from 'preact';
import style from "./style.css"
import folderIcon from "./folder.svg"
import PropTypes from 'prop-types';

function renderBackButton(onBackDirectoryClick) {
  return <div onClick={() => {
    onBackDirectoryClick()
  }}>
    <div className={style.flexContainerInner}>
      <div className={style.folderIcon}><img alt={"icon"} src={folderIcon}/>
      </div>
      <div>Back</div>
    </div>
  </div>;
}

function isRoot(location) {
  return location.length === 0 || location.length === 1
}

const DirectoryList = (props) => {
  console.log(props)

  return (
      <div className={style.flexContainer}>
        {!isRoot(props.currentLocation) && renderBackButton(
            props.onBackDirectoryClick)}
        {props.directories.map((value, index) =>
            (<div onClick={() => {
              props.onDirectoryClick(value.path + "/" + value.slugName)
            }}>
              <div className={style.flexContainerInner}>
                <div className={style.folderIcon}><img alt={"icon"}
                                                       src={folderIcon}/></div>
                <div>{value.originName}</div>
              </div>
            </div>)
        )}
      </div>
  );
};

DirectoryList.propTypes = {
  currentLocation: PropTypes.string,
  onDirectoryClick: PropTypes.func
}
export default DirectoryList;
