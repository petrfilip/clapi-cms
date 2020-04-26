import {h, Component, React} from 'preact';
import {route, Router} from 'preact-router';

import Header from './components/header';

// Code-splitting is automated for routes
import HomePage from './routes/home-page';
import EditContentPage from "./routes/edit-content-page";
import Modal from "./components/modal";
import {useState} from "preact/hooks";
import DefinitionEditorPage from "./routes/definition-editor-page";
import {LanguageContext} from "./components/translation/language-context";
import {AppModalContext} from "./components/modal/AppModalContextProvider";
import {FlashMessageContext} from "./components/flash-message-manager/flash-message-context";
import FlashMessages from "./components/flash-message-manager";
import LoginPage from "./routes/login-page";
import UserManager from "./components/user-manager";
import LogoutPage from "./routes/logout-page";
import NotFoundPage from "./routes/not-found-page";
import MediaPage from "./routes/media-page";

const App = (props) => {
  const [currentUrl, setCurrentUrl] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [modalBody, setModalBody] = useState();
  const [flashMessages, setFlashMessages] = useState([]);

  const handleRoute = e => {
    setCurrentUrl(e.url);
  };

  /* MODAL CONTEXT */
  const modalContextValue = {
    setModalBody: setModalBody,
    setIsModalVisible: setIsModalVisible
  };

  /* FLASH MESSAGE CONTEXT */
  const addMessage = (message) => {
    setFlashMessages([...flashMessages, message]);
  }

  const removeMessage = (indexToRemove) => {
    const newMessages = flashMessages.filter(
        (item, messageIndex) => messageIndex !== indexToRemove)
    setFlashMessages(newMessages)
  }

  const flashMessageContextValue = {
    addMessage: addMessage,
    removeMessage: removeMessage
  }

  if (!UserManager.getUserDetails()) {
    route("/login")
  }

  return (
      <div id="app">
        <LanguageContext.Provider value={"en"}>
          <FlashMessageContext.Provider value={flashMessageContextValue}>
            <FlashMessages messages={flashMessages}/>
            <AppModalContext.Provider value={modalContextValue}>
              <Header/>
              <Router onChange={handleRoute}>
                <HomePage path="/"/>
                <LoginPage path="/login"/>
                <LogoutPage path="/logout"/>
                <EditContentPage path="/edit/:collection/:id*"/>
                <MediaPage path="/media/edit/:id"/>
                <MediaPage path="/media/:location*"/>
                <DefinitionEditorPage path="/definition-editor/:typeDefinition*"/>
                <NotFoundPage path="/:notFound*"/>
              </Router>
              <Modal visible={isModalVisible}>{modalBody}</Modal>
            </AppModalContext.Provider>
          </FlashMessageContext.Provider>
        </LanguageContext.Provider>
      </div>
  );
}

export default App;
