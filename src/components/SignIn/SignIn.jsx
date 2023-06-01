import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import si from "./SignIn.module.css";

function SignIn({ setIsAuth, state }) {
  let logInfo = JSON.parse(localStorage.getItem("logInfo"));
  const [password, setPassword] = useState();
  const [login, setLogin] = useState();
  let Navig = useNavigate();
  const checkUser = (usersArray, existLogin, existPassword) => {
    for (let i = 0; i < usersArray.length; i++) {
      if (
        usersArray[i].login == existLogin &&
        usersArray[i].password == existPassword
      ) {
        usersArray[i].isAuth = true;
        logInfo.users[i].login = existLogin;
        logInfo.users[i].password = existPassword;
        logInfo.users[i].isAuth = true;

        localStorage.setItem("logInfo", JSON.stringify(logInfo));
        state.currentUser = logInfo.users[i];
        setIsAuth(true);
        return true;
      }
    }
    return false;
  };

  const clickButton = () => {
    if (logInfo) {
      if (checkUser(logInfo.users, login, password)) {
        alert("Welcome " + login);
        Navig("/main");
      } else alert("Incorrect password or User does not exist");
    } else {
      alert("Incorrect password or User does not exist");
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") clickButton();
  };
  return (
    <div className={si.container}>
      

      <div className={si.form}>
        <div className={si.sign_title}>Sign in</div>

        <div className={si.sign_block}>
          <label className={si.sign_label}>Name or Email</label>
          <input
            className={si.sign_inp}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className={si.sign_block}>
          <label className={si.sign_label}>Password</label>
          <input
            onKeyUp={(e) => handleKeyUp(e)}
            type="password"
            className={si.sign_inp}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={si.signButton} onClick={clickButton}>
          Log in
        </button>
        <p className={si.sign_subtext}>
          Don't have an account?
          <NavLink
            to="/signUp"
            className={(navData) => (navData.isActive ? si.active : "")}
          >
            {""}
            <label className={si.sign_subbtn}>Register</label>
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
