import { React } from 'preact'
import TypeDefinitionEditor from '../../components/type-definition-manager'
import TypeDefinitionList from '../../components/type-definition-manager/type-definition-list'
import * as api from '../../api'
import DataLoader from '../../components/data-loader'
import Button from '../../components/elementary/button'
import { useContext, useState } from 'preact/hooks'
import { LayoutContext } from '../../components/layout/layout-context'
import SimpleText from '../../components/content-editor/components/simple-text'
import ComponentEditWrapper from '../../components/content-editor/components/component-edit-wrapper'
import TypeDefinitionCreateForm from '../../components/type-definition-manager/type-definition-create-form'
import { useDocumentTitle } from '../../components/layout/window-title'

const DefinitionEditorPage = ({ typeDefinition }) => {
  useDocumentTitle(typeDefinition + ' :: Definition editor')
  const { setActionSidebar } = useContext(LayoutContext)

  return typeDefinition === '' ? (
    <>
      <Button
        onClick={() => {
          setActionSidebar(<TypeDefinitionCreateForm />)
        }}
      >
        Create new
      </Button>
      <TypeDefinitionList />
    </>
  ) : (
    <DataLoader uri={api.fetchTypeDefinition(typeDefinition)}>
      {(data) => <TypeDefinitionEditor typeDefinition={data} />}
    </DataLoader>
  )
}

const addNewCollectionForm = () => {
  const [collectionName, setCollectionName] = useState('')

  return (
    <>
      <ComponentEditWrapper
        id={'apiKey'}
        label={'Collection name'}
        type={'SimpleText'}
        initialValue={collectionName}
        onInput={(e) => setCollectionName(slugify(e.target.value))}
      />
      <Button onClick={() => {}}>Create</Button>
    </>
  )
}

export default DefinitionEditorPage
