import {h, React} from 'preact';
import style from './style.css';
import CollectionList from "../../components/collection-list";
import {useContext} from "preact/hooks";
import {AppModalContext} from "../../components/modal/AppModalContextProvider";
import DocumentTypeList from "../../components/document-type-list";
import Button from "../../components/elementary/button";


const HomePage = () => {

  const {setModalBody} = useContext(AppModalContext)

  return (
      <div className={style.home}>
        <Button onClick={()=> {
          setModalBody(<DocumentTypeList/>)
        }}>Create new</Button>
        <CollectionList/>
      </div>
  )
};

export default HomePage;
