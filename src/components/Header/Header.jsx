import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./Header.module.css";
function Header(props) {
  let logInfo = JSON.parse(localStorage.getItem("logInfo"));

  let Navig = useNavigate();

  const checkUser = (usersArray, currentUser) => {
    for (let i = 0; i < usersArray.length; i++) {
      if (usersArray[i].id == currentUser.id) {
        currentUser.isAuth = false;
        usersArray[i] = currentUser;
        logInfo.users[i] = currentUser;
        localStorage.setItem("logInfo", JSON.stringify(logInfo));
        props.setIsAuth(false);
        return true;
      }
    }
    return false;
  };

  const exitButton = () => {
    if (logInfo) {
      if (checkUser(logInfo.users, props.state.currentUser)) {
        Navig("/");
      } else alert("Error");
    } else {
      alert("LogInfo is empty");
    }
  };
  return (
    <div className={s.Header}>
      <div className={s.block}>
      <img src="/img/logocp.png" className={s.logo} />
        <div className={s.buttons_container}>
        <button className={s.exit} onClick={exitButton}>EXIT</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
