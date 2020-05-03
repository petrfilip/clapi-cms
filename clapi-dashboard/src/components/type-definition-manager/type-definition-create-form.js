import { React } from 'preact'
import TypeDefinitionEditor from '../../components/type-definition-manager'
import TypeDefinitionList from '../../components/type-definition-manager/type-definition-list'
import * as api from '../../api'
import DataLoader from '../../components/data-loader'
import DocumentTypeList from '../../components/document-type-list'
import Button from '../../components/elementary/button'
import { useContext, useState } from 'preact/hooks'
import { LayoutContext } from '../layout/layout-context'
import Input from '../../components/elementary/input'
import SimpleText from '../../components/content-editor/components/simple-text'
import ComponentEditWrapper from '../../components/content-editor/components/component-edit-wrapper'
import { slugify } from '../../utils/string-utils'
import { route } from 'preact-router'
import DataManager from '../data-loader/data-manager'

const TypeDefinitionCreateForm = ({ typeDefinition }) => {
  const [collectionName, setCollectionName] = useState('')
  const { setActionSidebar } = useContext(LayoutContext)

  return (
    <>
      <ComponentEditWrapper
        id={'collectionName'}
        label={'Collection name'}
        type={'SimpleText'}
        initialValue={collectionName}
        onInput={(e) => setCollectionName(e.target.value)}
      />

      <ComponentEditWrapper
        id={'apiKey'}
        label={'Collection name key'}
        type={'SimpleText'}
        initialValue={slugify(collectionName)}
        disabled
      />
      <Button
        onClick={() => {
          const toSave = {
            metadata: { collectionName: slugify(collectionName) },
            data: { main: { name: 'Main', config: {} } },
          }
          DataManager.saveOrUpdate(api.fetchCollection('type-definition'), 'json', toSave, (data) => {
            console.log(data)
            setActionSidebar(null)
            route('/definition-editor/' + slugify(collectionName))
          })
        }}
      >
        Create
      </Button>
    </>
  )
}

export default TypeDefinitionCreateForm
