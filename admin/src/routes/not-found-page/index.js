import { React } from 'preact'
import LoginForm from '../../components/login-form/login-form'
import { useDocumentTitle } from '../../components/layout/window-title'

const NotFoundPage = (props) => {
  useDocumentTitle('Requested page not found :-((')

  console.log(props)
  return <h1>NOT FOUND</h1>
}

export default NotFoundPage
