import { React } from 'preact'
import LoginForm from '../../components/login-form/login-form'
import { useDocumentTitle } from '../../components/layout/window-title'

const LoginPage = () => {
  useDocumentTitle('Login')

  return <LoginForm />
}

export default LoginPage
