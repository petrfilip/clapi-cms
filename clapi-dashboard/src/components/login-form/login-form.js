import {React} from "preact";
import DataManager from "../data-loader/data-manager";
import * as api from "../../api";
import {useState} from "preact/hooks";
import UserManager from "../user-manager";
import {route} from "preact-router";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = () => {
    DataManager.saveOrUpdate(api.fetchLogin(), "json",
        {email, password}, (userInfo) => {
          userInfo.onsuccess
          console.log(userInfo);
          UserManager.setUserDetails(userInfo);
        })
  }

  if (UserManager.getUserDetails()) {
    route("/");
  }

  return (
      <form>
        <h1>Login</h1>
        <input onInput={(e) => setEmail(e.target.value)}/>
        <input onInput={(e) => setPassword(e.target.value)}/>
        <button onClick={(e) => {
          e.preventDefault();
          onFormSubmit();
        }}>Login
        </button>
        <button onClick={(e) => {
          e.preventDefault();
          UserManager.clearUserDetails();
        }}>
          Logout
        </button>
      </form>
  )
};

export default LoginForm;
