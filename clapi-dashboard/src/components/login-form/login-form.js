import {React} from "preact";
import DataManager from "../data-loader/data-manager";
import * as api from "../../api";
import {useState} from "preact/hooks";
import UserManager from "../user-manager";
import {route} from "preact-router";
import Button from "../elementary/button";

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
        <Button onClick={(e) => {
          e.preventDefault();
          onFormSubmit();
        }}>Login
        </Button>
        <Button onClick={(e) => {
          e.preventDefault();
          UserManager.clearUserDetails();
        }}>
          Logout
        </Button>
      </form>
  )
};

export default LoginForm;
