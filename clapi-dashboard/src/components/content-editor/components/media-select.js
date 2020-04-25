import {React} from "preact";
import FileManager from "../../file-manager";
import {useContext} from "preact/hooks";
import {AppModalContext} from "../../modal/AppModalContextProvider";
import {Mode} from "../../file-manager/file-list";
import style from "./media-select.css"
import * as api from "../../../api";
import DataLoader from "../../data-loader";

const MediaSelect = (props) => {

  const onMediaSelected = (item) => {
    props.onInputChangeCallback(props.id, item._id);
  }

  const {setModalBody} = useContext(AppModalContext)

  return (
      <div className={style.row}>
        <DataLoader
            forceShowChild={true}
            uri={props.initialValue && api.fetchMedia(props.initialValue)}>
          {data => (
              <>
                <div className={style.select}
                     onClick={() => {
                       setModalBody(<FileManager
                           routeAllowed={false}
                           selectedItem={data}
                           fileListMode={Mode.SELECTION}
                           onMediaClick={onMediaSelected}/>);
                     }}>Select
                </div>
                <div>{data && data.originName}</div>
                <div onClick={() => onMediaSelected({})}>X</div>
              </>
          )}
        </DataLoader>
      </div>
  )
};

export default MediaSelect;
