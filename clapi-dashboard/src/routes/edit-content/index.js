import {React} from 'preact';
import ContentEditor from "../../components/content-editor/content-editor";
import DataLoader from "../../components/data-loader";
import * as api from "../../api";

const EditPage = ({collection, id}) => {

  return (
      <DataLoader skipLoader={true} uri={api.fetchTypeDefinition(collection)}>
        {data => {
          const typeDefinition = data;
          return (<DataLoader skipLoader={true}
                              uri={id && api.fetchCollectionContent(collection,
                                  id)}>
            {data => {

              if (!data) {
                data = {
                  collectionName: collection, //todo will be moved to metadata
                  metadata: {
                    collectionName: collection,
                    typeDefinitionVersion: typeDefinition.sys.version
                  }
                }
              }

              return <ContentEditor
                  values={data}
                  config={typeDefinition.config}/>
            }}
          </DataLoader>)
        }}
      </DataLoader>

  )
};

export default EditPage;