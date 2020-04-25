import {React} from "preact";
import {init} from 'pell';
import {useEffect, useState} from "preact/hooks";
import 'pell/dist/pell.css'

const TextArea = (props) => {
  const [html, setHtml] = useState();

  useEffect(() => {
    init({
      element: document.getElementById('editor'),
      onChange: newHtml => props.onInputChangeCallback(props.id, newHtml),
      defaultParagraphSeparator: 'p',
      actions: ['bold', 'underline', 'italic', {
        name: 'link',
        result: (val) => {
          console.log("asdf" + val)
        }
      }],
    })
  }, [])

  return (

      <div className="App">
        <h3>Editor:</h3>
        <div id="editor" className="pell"/>
        <h3>HTML Output:</h3>
        <div id="html-output">{html}</div>
      </div>

  )
};

export default TextArea;
