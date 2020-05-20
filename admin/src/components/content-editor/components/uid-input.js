import { React } from 'preact'
import SimpleText from './simple-text'
import { slugifyContent } from '../../../utils/string-utils'

//todo need to be improved
const UidInput = (props) => {
  const newProps = props
  const newValue = slugifyContent(props.initialValue || '')

  return <SimpleText {...newProps} initialValue={newValue} />
}

export default UidInput
