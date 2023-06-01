import React from "react";
import s from "./Modal.module.css";
const Modal = (props) => {
  let defaultIconsIncome = [
    "books.png",
    "credit-card.png",
    "fork.png",
    "monitor.png",
    "car.png",
    "educ.png",
    "graduation-cap.png",
    "plane.png",
    "new.png",
    "shopping-bag.png",
    "weight.png",
    "game.png",
    "shirt.png",
    "medicine.png",
    "music.png",
    "bus.png",
    "pet.png"
  ];

  return (
    <div
      className={props.active ? "modal active" : "modal"}
      onClick={() => props.setActive(false)}
    >
      <div
        className={props.active ? "content active" : "content"}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        <div className={s.modal_right}>
        <img src="" alt="" />
        <div>
          {defaultIconsIncome.map((item) => (
            <img onClick={(e)=>props.setIcons(item)} className={s.icon_choose} src={`/img/${item}`} />
            
            
          ))}
          
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Modal;
