import { React } from 'preact'
import LoginForm from '../../components/login-form/login-form'
import UserManager from '../../components/user-manager'
import { route } from 'preact-router'

const LogoutPage = () => {
  UserManager.clearUserDetails()
  route('/admin/login')
  return null
}

export default LogoutPage
