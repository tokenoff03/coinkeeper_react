import Income from "../Income/Income";
import { useState } from "react";
import Account from "../Accounts/Account";
import Expenses from "../Expenses/Expenses";
import History from "../History/History";
import HeaderInput from "../HeaderInput/HeaderInput";
import Header from "../Header/Header";
import { Navigate } from "react-router-dom";

function Main(props) {
  const logInfo = JSON.parse(localStorage.getItem("logInfo"));
  if (!props.state.currentUser.isAuth) return <Navigate to="/" />;
  if (props.state.currentUser.data.length == 0) {
    for (let i = 0; i < props.defaultData.length; i++) {
      props.state.currentUser.data.push(props.defaultData[i]);
    }
  }

  return (
    <div className="appmain">
      <img className="dollars1" src="/img/dollars.png"/>
      <img className="dollars2" src="/img/dollars.png"/>
      <img className="dollars3" src="/img/dollars.png"/>
      <img className="dollars4" src="/img/dollars.png"/>
      <img className="dollars5" src="/img/dollars.png"/>
      
      <Header
        isAuth={props.isAuth}
        setIsAuth={props.setIsAuth}
        state={props.state}
      />
      <div>
        <HeaderInput
          history={props.state.currentUser.history}
          data={props.state.currentUser.data}
          // setData={props.state.currentUser.data}
          rerenderTree={props.rerenderTree}
        />

        <div className="mainchapter">
          <div>
            <Income
              title={"Income"}
              history={props.state.currentUser.history}
              data={props.state.currentUser.data}
              defaultIconsIncome={props.state.defaultIconsIncome}
              rerenderTree={props.rerenderTree} /*setData={props.setData}*/
            />
            <Account
              title={"Account"}
              data={props.state.currentUser.data}
              rerenderTree={props.rerenderTree}
            />
            <Expenses
              title={"Expenses"}
              data={props.state.currentUser.data}
              rerenderTree={props.rerenderTree}
            />
          </div>
          <History
            history={props.state.currentUser.history}
            rerenderTree={props.rerenderTree}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
