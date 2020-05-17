import DataManager from '../data-loader/data-manager'
import * as api from '../../api'
import { useEffect, useState } from 'preact/hooks'
import UserManager from '../user-manager'
import { route } from 'preact-router'
import Button from '../elementary/button'
import Input from '../elementary/input'

import React from 'preact/compat'
import styled from 'styled-components'
import Table from '../table'
import ApplicationManager from '../application-manager/application-manager'
import DataLoader from '../data-loader'

const columns = [
  { key: 'key', title: 'Key' },
  { key: 'current', title: 'Current' },
  { key: 'required', title: 'Required' },
  { key: 'status', title: 'Status' },
  { key: 'description', title: 'Description' },
]

const InitForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFormSubmit = () => {
    DataManager.saveOrUpdate(api.fetchInit(), 'json', { email, password }, (userInfo) => {
      ApplicationManager.setIsApplicationInitialized(true)
      route('/admin/login')
    })
  }

  return (
    <>
      <DataLoader uri={api.fetchInitRequirements()}>{(data) => <Table columns={columns} rows={data} />}</DataLoader>

      {!UserManager.getUserDetails() && (
        <Form>
          <h1>INIT APPLICATION</h1>

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
      )}
    </>
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

export default InitForm
