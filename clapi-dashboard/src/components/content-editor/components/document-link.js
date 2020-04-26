import {React} from "preact";
import FileManager from "../../file-manager";
import {useContext, useEffect, useState} from "preact/hooks";
import {AppModalContext} from "../../modal/AppModalContextProvider";
import {Mode} from "../../file-manager/file-list";
import style from "./media-select.css"
import CollectionList from "../../collection-list";
import * as api from "../../../api";
import DataManager from "../../data-loader/data-manager";
import DataLoader from "../../data-loader";

const DocumentLink = (props) => {

  const onDocumentSelected = (item) => {
    props.onInputChangeCallback(props.id,
        {id: item._id, collectionName: item.collectionName});
  }

  const {setModalBody} = useContext(AppModalContext)

  return (
      <div className={style.row}>

        <DataLoader
            uri={props.initialValue && props.initialValue.id && api.fetchCollectionContent(props.initialValue.collectionName,
                props.initialValue.id)}>
          {data => (
              <>
                <div className={style.select}
                     onClick={() => {
                       setModalBody(<CollectionList
                           onRowClick={onDocumentSelected}/>);
                     }}>Select
                </div>
                <div>{data && data._id}</div>
                <div onClick={() => onDocumentSelected({})}>X</div>
              </>
          )}
        </DataLoader>
      </div>

  )
};

export default DocumentLink;
