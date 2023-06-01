import React from "react";
import trash from "../../components/trash.png";
import s from "./History.module.css";
import { useState } from "react";
const History = (props) => {
  function deleteHistory(id) {
    debugger;
    for (let i = 0; i < props.history.length; i++) {
      if (props.history[i].id == id) {
        props.history[i].status = false;
      }
    }
    props.rerenderTree();
  }Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}
var dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let weekNumber = (new Date()).getWeek();
  var now = new Date();
  let d = new Date().toLocaleString('ru', {
  
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={s.history_block}>
      {props.history.length != 0 ? (
        props.history.map((item) =>
          item.status ? (
            <div className={s.history_inner}>
              <div className={s.hisory_top}>
                <div className={s.from}>
                  <div className={s.from_title}>{item.from_title}</div>
                  <div className={item.money<0?s.redmoney:s.money_title}>{item.money}</div>
                </div>
                <div className={s.to_title}>{item.to_title}</div>
              </div>
              <div className={s.history_bottom}>
                <img
                  className={s.delete}
                  src={trash}
                  onClick={(e) => deleteHistory(item.id)}
                ></img>
              </div>
            </div>
          ) : (
            ""
          )
        )
      ) : (
        <>
          <div className={s.title}>{dayNames[now.getDay()]}, {d}</div>
          <div>
            Здесь будет список ваших операций, в котором вы всегда сможете найти
            историю ваших покупок, отредактировать, повторить или удалить их
          </div>
        </>
      )}
    </div>
  );
};

export default History;
