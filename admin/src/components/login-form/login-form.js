import DataManager from '../data-loader/data-manager'
import * as api from '../../api'
import { useEffect, useState } from 'preact/hooks'
import UserManager from '../user-manager'
import { route } from 'preact-router'
import Button from '../elementary/button'
import Input from '../elementary/input'
import { InputWrapper } from '../file-editor/input-wrapper'
import ComponentEditWrapper from '../content-editor/components/component-edit-wrapper'

import React from 'preact/compat'
import styled from 'styled-components'
import { Center } from '../layout/center'
import ApplicationManager from '../application-manager/application-manager'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFormSubmit = () => {
    DataManager.saveOrUpdate(api.fetchLogin(), 'json', { email, password }, (userInfo) => {
      UserManager.setUserDetails(userInfo)
      route('/admin/entries')
    })
  }

  if (UserManager.getUserDetails()) {
    route('/admin/entries')
  }

  return (
    <Form>
      <h1>Login</h1>

      <Input onInput={(e) => setEmail(e.target.value)} />
      <Input type={'password'} onInput={(e) => setPassword(e.target.value)} />

      <Button
        onClick={(e) => {
          e.preventDefault()
          onFormSubmit()
        }}
      >
        Login
      </Button>
    </Form>
  )
}

const Form = styled.form`
  width: 400px;
  background: white;
  padding: 4px;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.gray};
  margin: 5px auto;
`

export default LoginForm
