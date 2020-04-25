import {React} from "preact";
import FileManager from "../../file-manager";
import {useContext, useEffect, useState} from "preact/hooks";
import {AppModalContext} from "../../modal/AppModalContextProvider";
import {Mode} from "../../file-manager/file-list";
import style from "./media-select.css"
import CollectionList from "../../collection-list";
import * as api from "../../../api";

const DocumentLink = (props) => {
  const [selectedItem, setSelectedItem] = useState({});

  const onDocumentSelected = (item) => {
    setSelectedItem(item);
    props.onInputChangeCallback(props.id,
        {id: item._id, collectionName: item.collectionName});
  }

  async function fetchData(itemId, collectionName) {
    const res = await fetch( //todo collection to request
        api.fetchCollectionContent(collectionName, itemId),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
    res.json().then(res => {
      setSelectedItem(res);
    }).catch(err => alert(err));
  }

  useEffect(() => {
    props.initialValue && fetchData(props.initialValue.id,
        props.initialValue.collectionName);
  }, [props.initialValue]);

  const {setModalBody} = useContext(AppModalContext)

  return (
      <div className={style.row}>
        <div className={style.select}
             onClick={() => {
               setModalBody(<CollectionList
                   onRowClick={onDocumentSelected}/>);
             }}>Select
        </div>
        <div>{selectedItem._id}</div>
        <div onClick={() => setSelectedItem({})}>X</div>

      </div>
  )
};

export default DocumentLink;
