import { React } from 'preact'
import InitForm from '../../components/init-form/init-form'
import { useDocumentTitle } from '../../components/layout/window-title'

const InitPage = () => {
  useDocumentTitle('Init System')

  return <InitForm />
}

export default InitPage
