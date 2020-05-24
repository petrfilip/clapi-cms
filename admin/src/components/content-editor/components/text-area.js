import { React } from 'preact'
import { init } from 'pell'
import { useEffect } from 'preact/hooks'
import css from './pell.css'
import Input from '../../elementary/input'

function generateRandomString() {
  return Math.random().toString(36).substring(7)
}
function getOnInput(props) {
  return (event) => {
    ;(props.onInput && props.onInput(event)) ||
      (props.onInputChangeCallback && props.onInputChangeCallback(props.id, event.target.value))
  }
}

const TextArea = (props) => {
  // const editorId = generateRandomString() + '-editor'
  // useEffect(() => {
  //   const pell = init({
  //     element: document.getElementById(editorId),
  //     onChange: (newHtml) => props.onInputChangeCallback(props.id, newHtml),
  //     defaultParagraphSeparator: 'p',
  //     actions: [
  //       'bold',
  //       'underline',
  //       'italic',
  //       'olist',
  //       'ulist',
  //       {
  //         name: 'link',
  //         result: (val) => {
  //           alert('TODO' + val)
  //         },
  //       },
  //     ],
  //     classes: {
  //       actionbar: css.pellActionbar,
  //       button: css.pellButton,
  //       content: css.pellContent,
  //       selected: css.pellButtonSelected,
  //     },
  //   })
  //   pell.content.innerHTML = props.initialValue || ''
  //
  //   pell.addEventListener('paste', function (e) {
  //     e.preventDefault()
  //
  //     if (e.clipboardData) {
  //       const content = e.clipboardData.getData('text/plain')
  //       document.execCommand('insertText', false, content)
  //     }
  //   })
  // }, [props.index])

  return (
    <textarea
      value={props.initialValue || ''}
      key={[props.index, props.id, props.type].join('_')}
      onInput={getOnInput(props)}
    />
  )

  // return (
  //   <div className={css.pell}>
  //     <div id={editorId} className="pell" />
  //   </div>
  // )
}

export default TextArea
