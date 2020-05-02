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

const TypeDefinitionSnippetSettingsForm = ({ value = {}, onDoneButtonClick }) => {
  const [snippetName, setSnippetName] = useState(value.snippetName || '')
  const [snippetKey, setSnippetKey] = useState(value.snippetKey || '')
  const [snippetIcon, setSnippetIcon] = useState(value.snippetIcon || '')
  const { setActionSidebar } = useContext(LayoutContext)

  return (
    <>
      //todo menu [create new, use existing]
      <h2>Snippet settings</h2>
      <ComponentEditWrapper
        id={'collectionName'}
        label={'Snippet name'}
        type={'SimpleText'}
        initialValue={snippetName}
        onInput={(e) => setSnippetName(e.target.value)}
      />
      <ComponentEditWrapper
        id={'apiKey'}
        label={'Snippet key'}
        type={'SimpleText'}
        initialValue={slugify(snippetName)}
        disabled
      />
      <Button onClick={() => onDoneButtonClick({ snippetName, snippetKey: slugify(snippetName), snippetIcon })}>
        Create
      </Button>
    </>
  )
}

export default TypeDefinitionSnippetSettingsForm
