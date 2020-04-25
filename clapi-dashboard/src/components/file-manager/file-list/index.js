import {h, React} from 'preact';
import style from "./style.css"
import downloadIcon from "./download.svg"
import {useState} from "preact/hooks";
import * as api from "../../../api";

export const Mode = {
  SELECTION: "SELECTION",
  EDIT: "EDIT"
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const FileList = (props) => {
  const [selected, setSelected] = useState(props.selectedItem || {})
  const [mode, setMode] = useState(props.fileListMode || Mode.EDIT)

  return (
      <div className={style.flexContainer}>
        {props.files.map((value, index) =>
            (<div
                className={mode === Mode.SELECTION && value._id === selected._id
                && style.selected}
                onClick={() => {
                  mode === Mode.SELECTION && setSelected(value);
                  props.onMediaClick && props.onMediaClick(value);
                }}>
              <div className={style.flexContainerInner}>
                <div className={style.bold}>{value.originName}</div>
                <div className={style.small}>{value.attributes.type}</div>
                <div className={style.small}>{formatBytes(value.attributes.size,
                    2)}
                </div>
                <div className={style.downloadIcon}>
                  <img src={downloadIcon}
                       alt={"download file"}
                  />
                </div>
              </div>
              <div>
                <img className={style.filePreview}
                     src={api.apiUrl + value.fullPath}
                     alt={value.originName}/>
              </div>
            </div>)
        )}
      </div>
  );
};
export default FileList;
