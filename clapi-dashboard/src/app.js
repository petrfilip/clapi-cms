import {h, Component, React} from 'preact';
import {route, Router} from 'preact-router';

import Header from './components/header';

// Code-splitting is automated for routes
import Home from './routes/home';
import EditPage from "./routes/edit-content";
import Media from "./routes/media";
import Modal from "./components/modal";
import {useState} from "preact/hooks";
import {AppModalContext} from "./components/modal/AppModalContextProvider";
import DefinitionEditor from "./routes/definition-editor";
import {FlashMessageContext} from "./components/flash-message-manager/flash-message-context";
import FlashMessages from "./components/flash-message-manager";
import LoginPage from "./routes/login";
import UserManager from "./components/user-manager";
import LogoutPage from "./routes/logout";

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
    const newMessages = flashMessages.filter((item , messageIndex) => messageIndex !== indexToRemove)
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
        <FlashMessageContext.Provider value={flashMessageContextValue}>
          <FlashMessages messages={flashMessages}/>
          <AppModalContext.Provider value={modalContextValue}>
            <Header/>
            <Router onChange={handleRoute}>
              <Home path="/"/>
              <LoginPage path="/login"/>
              <EditPage path="/edit/:collection/:id*"/>
              <Media path="/media/:path*"/>
              <DefinitionEditor path="/definition-editor/:typeDefinition*"/>
              <LogoutPage path="/logout"/>
            </Router>
            <Modal visible={isModalVisible}>{modalBody}</Modal>
          </AppModalContext.Provider>
        </FlashMessageContext.Provider>
      </div>
  );
}

export default App;
