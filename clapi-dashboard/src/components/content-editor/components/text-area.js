import { React } from 'preact'
import { init } from 'pell'
import { useEffect, useState } from 'preact/hooks'
import 'pell/dist/pell.css'

const TextArea = (props) => {
    useEffect(() => {
        init({
            element: document.getElementById('editor'),
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
            <div id="editor" className="pell" />
        </div>
    )
}

export default TextArea
