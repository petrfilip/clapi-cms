import { React } from 'preact'
import TypeDefinitionEditor from '../../components/type-definition-manager'
import TypeDefinitionList from '../../components/type-definition-manager/type-definition-list'
import * as api from '../../api'
import DataLoader from '../../components/data-loader'
import Button from '../../components/elementary/button'
import { useContext } from 'preact/hooks'
import { LayoutContext } from '../../components/layout/layout-context'
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

export default DefinitionEditorPage
