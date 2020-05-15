import { h, Component, React } from 'preact'
import { route, Router } from 'preact-router'

// Code-splitting is automated for routes
import HomePage from './routes/home-page'
import EditContentPage from './routes/edit-content-page'
import Modal from './components/modal'
import { useState } from 'preact/hooks'
import DefinitionEditorPage from './routes/definition-editor-page'
import { LanguageContext } from './components/translation/language-context'
import { AppModalContext } from './components/modal/AppModalContextProvider'
import { FlashMessageContext } from './components/flash-message-manager/flash-message-context'
import FlashMessages from './components/flash-message-manager'
import LoginPage from './routes/login-page'
import UserManager from './components/user-manager'
import LogoutPage from './routes/logout-page'
import NotFoundPage from './routes/not-found-page'
import MediaPage from './routes/media-page'
import PageLayout from './components/layout/page-layout'

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import reset from 'styled-reset'
import SettingsPage from './routes/settings-page/settings-page'
import InitPage from './routes/init-page'
import ApplicationManager from './components/application-manager/application-manager'
import DataManager from './components/data-loader/data-manager'
import * as api from './api'

const App = (props) => {
  const [currentUrl, setCurrentUrl] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [modalBody, setModalBody] = useState()
  const [flashMessages, setFlashMessages] = useState([])

  const handleRoute = (e) => {
    setCurrentUrl(e.url)
  }

  /* MODAL CONTEXT */
  const modalContextValue = {
    setModalBody: setModalBody,
  }

  /* FLASH MESSAGE CONTEXT */
  const addMessage = (message) => {
    setFlashMessages([...flashMessages, message])
  }

  const removeMessage = (indexToRemove) => {
    const newMessages = flashMessages.filter((item, messageIndex) => messageIndex !== indexToRemove)
    setFlashMessages(newMessages)
  }

  const flashMessageContextValue = {
    addMessage: addMessage,
    removeMessage: removeMessage,
  }

  console.log(!!UserManager.getUserDetails(), ApplicationManager.isApplicationInitialized())
  if (!UserManager.getUserDetails() && !ApplicationManager.isApplicationInitialized()) {
    // check if application is initialized
    DataManager.postRequest(api.fetchInit()).then((response) => {
      if (response.status === 424) {
        route('/admin/init')
        ApplicationManager.setIsApplicationInitialized(false)
      } else {
        ApplicationManager.setIsApplicationInitialized(true)
      }
    })
  } else if (!UserManager.getUserDetails() && ApplicationManager.isApplicationInitialized()) {
    route('/admin/login')
  }

  const theme = {
    primary: '#0072BB',
    secondary: '#FFF',
    lightgray: '#eeeeee',
    gray: '#e2e2e2',
    darkgray: '#aaa',
    white: 'white',
  }

  return (
    <LanguageContext.Provider value={'en'}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <FlashMessageContext.Provider value={flashMessageContextValue}>
          <FlashMessages messages={flashMessages} />
          <AppModalContext.Provider value={modalContextValue}>
            <PageLayout currentUrl={currentUrl}>
              <Router onChange={handleRoute}>
                <InitPage path="/admin/init" />
                <LoginPage path="/admin/login" />
                <LogoutPage path="/admin/logout" />
                <HomePage path="/admin/entries" />
                <SettingsPage path="/admin/settings" />
                <EditContentPage path="/admin/edit/:collection/:id*" />
                <MediaPage path="/admin/media/edit/:id" />
                <MediaPage path="/admin/media/:location*" />
                <DefinitionEditorPage path="/admin/definition-editor/:typeDefinition*" />
                <NotFoundPage path="/admin/:notFound*" />
              </Router>
            </PageLayout>

            <Modal visible={isModalVisible}>{modalBody}</Modal>
          </AppModalContext.Provider>
        </FlashMessageContext.Provider>
      </ThemeProvider>
    </LanguageContext.Provider>
  )
}
const GlobalStyle = createGlobalStyle`
   body {
     margin: 0;
     padding: 0;
     overflow: hidden;
     height: 100%;
     background-color: #eeeeee;
    
   }
`

export default App
