import { React } from 'preact'
import Button from '../../components/elementary/button'
import { useContext, useState } from 'preact/hooks'
import { LayoutContext } from '../layout/layout-context'
import SimpleText from '../../components/content-editor/components/simple-text'
import ComponentEditWrapper from '../../components/content-editor/components/component-edit-wrapper'
import { slugify } from '../../utils/string-utils'

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
