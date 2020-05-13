import { React } from 'preact'
import { init } from 'pell'
import { useEffect } from 'preact/hooks'
import css from './pell.css'

function generateRandomString() {
  return Math.random().toString(36).substring(7)
}

const TextArea = (props) => {
  console.log(props)
  const editorId = generateRandomString() + '-editor'
  useEffect(() => {
    const pell = init({
      element: document.getElementById(editorId),
      onChange: (newHtml) => props.onInputChangeCallback(props.id, newHtml),
      defaultParagraphSeparator: 'p',
      actions: [
        'bold',
        'underline',
        'italic',
        'olist',
        'ulist',
        {
          name: 'link',
          result: (val) => {
            console.log('asdf' + val)
          },
        },
      ],
      classes: {
        actionbar: css.pellActionbar,
        button: css.pellButton,
        content: css.pellContent,
        selected: css.pellButtonSelected,
      },
    })
    pell.content.innerHTML = props.initialValue || ''

    pell.addEventListener('paste', function (e) {
      e.preventDefault()

      if (e.clipboardData) {
        const content = e.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, content)
      }
    })
  }, [])

  return (
    <div className={css.pell}>
      <div id={editorId} className="pell" />
    </div>
  )
}

export default TextArea
