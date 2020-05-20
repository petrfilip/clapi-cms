import { React } from 'preact'
import ContentEditor from '../../components/content-editor/content-editor'
import DataLoader from '../../components/data-loader'
import * as api from '../../api'
import { useDocumentTitle } from '../../components/layout/window-title'

const EditContentPage = ({ collection, id }) => {
  useDocumentTitle(collection + ' :: Content Editor')

  return (
    <DataLoader skipLoader={true} uri={api.fetchTypeDefinition(collection)}>
      {(data) => {
        const typeDefinition = data
        return (
          <DataLoader skipLoader={true} uri={id && api.fetchCollectionContent(collection, id)}>
            {(data) => {
              if (!data) {
                data = {
                  metadata: {
                    collectionName: collection,
                    typeDefinitionVersion: typeDefinition.sys.version,
                  },
                  data: {
                    main: {},
                  },
                }
              }

              return <ContentEditor values={data} config={typeDefinition.data} />
            }}
          </DataLoader>
        )
      }}
    </DataLoader>
  )
}

export default EditContentPage
