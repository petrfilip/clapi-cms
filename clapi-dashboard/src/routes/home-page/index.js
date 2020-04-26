import {h, React} from 'preact';
import style from './style.css';
import CollectionList from "../../components/collection-list";
import {useContext} from "preact/hooks";
import {AppModalContext} from "../../components/modal/AppModalContextProvider";
import DocumentTypeList from "../../components/document-type-list";


const HomePage = () => {

  const {setModalBody} = useContext(AppModalContext)

  return (
      <div className={style.home}>
        <button onClick={()=> {
          setModalBody(<DocumentTypeList/>)
        }}>Create new</button>
        <CollectionList/>
      </div>
  )
};

export default HomePage;
