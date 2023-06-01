import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import su from "./SignUp.module.css";
const SignUp = () => {
  let Navig = useNavigate();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState();
  const checkUser = (usersArray, existLogin, existPassword) => {
    for (let i = 0; i < usersArray.length; i++) {
      if (
        usersArray[i].login == existLogin &&
        usersArray[i].password == existPassword
      ) {
        return true;
      }
    }
    return false;
  };
  function clickButton(event) {
    let logInfo = JSON.parse(localStorage.getItem("logInfo"));
    if (login != "" && password != "") {
      if (logInfo) {
        if (checkUser(logInfo.users, login, password)) {
          alert("User Exist!!");
          Navig("/");
        } else {
          logInfo.users.push({
            id: logInfo.users.length + 1,
            login: login,
            password: password,
            isAuth: false,
            data: [],
            history: [],
          });
          localStorage.setItem("logInfo", JSON.stringify(logInfo));
          Navig("/");
        }
      } else {
        localStorage.setItem(
          "logInfo",
          JSON.stringify({
            users: [{ login: login, password: password, isAuth: false }],
          })
        );
        Navig("/");
      }
    } else {
      alert("Login or password is empty");
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === "Enter") clickButton();
  };
  return (
    <div className={su.container}>
      

      <div className={su.form}>
        <div className={su.sign_title}>Sign up</div>

        <div className={su.sign_block}>
          <label className={su.sign_label}>Full Name</label>
          <input
            className={su.sign_inp}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className={su.sign_block}>
          <label className={su.sign_label}>Password</label>
          <input
            onKeyUp={(e) => handleKeyUp(e)}
            className={su.sign_inp}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className={su.signButton}
          onClick={(event) => clickButton(event)}
        >
          Register
        </button>
        <p className={su.sign_subtext}>
          Already have an account?
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? su.active : "")}
          >
            {""}
            <label className={su.sign_subbtn}>Log in</label>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
