import { React } from 'preact'
import { init } from 'pell'
import { useEffect } from 'preact/hooks'
import 'pell/dist/pell.css'

function generateRandomString() {
  return Math.random().toString(36).substring(7)
}

const TextArea = (props) => {
  const editorId = generateRandomString() + '-editor'
  console.log(props)
  useEffect(() => {
    init({
      element: document.getElementById(editorId),
      onChange: (newHtml) => props.onInputChangeCallback(props.id, newHtml),
      defaultParagraphSeparator: 'p',
      actions: [
        'bold',
        'underline',
        'italic',
        {
          name: 'link',
          result: (val) => {
            console.log('asdf' + val)
          },
        },
      ],
    })
  }, [])

  return (
    <div className="App">
      <h3>Editor:</h3>
      <div id={editorId} className="pell" />
    </div>
  )
}

export default TextArea
