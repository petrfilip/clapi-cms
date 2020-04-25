import {h, React} from 'preact';
import style from "./style.css"
import DataManager from "../../data-loader/data-manager";
import * as api from "../../../api";

function onChangeHandler(currentLocation, event, callback) {
  event.preventDefault();
  const files = event.target.files || event.dataTransfer.items;
  if (files) {
    const data = new FormData();
    data.append("location", currentLocation);
    data.append("action", "upload-files");
    for (const file of files) {
      data.append('files[]', file, file.name);
    }

    DataManager.saveOrUpdate(api.fetchMediaUpload(), "data", data, callback);
  }
}

const FileUpload = (props) => {
  return (
      <div className={style.area}>
        <form>
          <input type="file" multiple accept="*"
                 onInput={(e) => onChangeHandler(props.currentLocation, e,
                     props.callback)}/>
        </form>
      </div>
  );
};
export default FileUpload;
