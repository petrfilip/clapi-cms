import { React } from 'preact'
import TypeDefinitionEditor from '../../components/type-definition-manager'
import TypeDefinitionList from '../../components/type-definition-manager/type-definition-list'
import * as api from '../../api'
import DataLoader from '../../components/data-loader'

const DefinitionEditorPage = ({ typeDefinition }) => {
    return typeDefinition === '' ? (
        <>
            <TypeDefinitionList />
        </>
    ) : (
        <DataLoader uri={api.fetchTypeDefinition(typeDefinition)}>
            {(data) => <TypeDefinitionEditor typeDefinition={data} />}
        </DataLoader>
    )
}

export default DefinitionEditorPage
