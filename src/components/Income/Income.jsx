import React, { useState } from "react";
import s from "./Income.module.css";
import Modal from "../Modal/Modal";
import Newblock from "../New/Newblock";
const Income = (props) => {
  const [activeModal2, setActiveModal2] = useState(false); //отвечает за открытие модалки добавить
  const [inputTitle, setInputTitle] = useState(""); // название инпута
  const [inputAmount, setinputAmount] = useState(""); // название количество денег
  const [activeModal, setActiveModal] = useState(false); //отвечает за открытие модалки редактировать
  const [value, setValue] = useState(""); // название количество тоже денег
  const [modalTitle, setModalTitle] = useState(""); // название инпута в модалке редактировать
  const [deleteOpt, setDeleteOpt] = useState(true); // в модалке при нажатий на кнопку удалить чтобы поялвялись другие кнопки
  const [options, setOptions] = useState(""); // для валюты
  const [ids, setId] = useState(""); // айдишка
  const [amounts, setAmounts] = useState(0);

  const [icons, setIcons] = useState("credit-card.png");
  let incomeMoney = 0;
  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].title === "Income") {
      incomeMoney += props.data[i].count;
    }
  }

  function deleteItems(id) {
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].id == id) {
        props.data[i] = "";
      }
      setActiveModal(false);
    }
  }

  function edits(id) {
    if (
      modalTitle !== "" &&
      value !== "" &&
      modalTitle !== null &&
      value !== null &&
      options !== undefined
    ) {
      for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].id == id) {
          props.data[i].name = modalTitle;
          props.data[i].amount = value;
          props.data[i].icons = icons;
        }
      }

      incomeAmountCounter();
      props.rerenderTree();
      setActiveModal(false);
    }
  }

  function incomeAmountCounter() {
    let counter = 0;
    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].title == "Income") {
        counter += parseFloat(props.data[i].amount);
      }
    }

    setAmounts(counter);
  }

  function addBlock() {
    if (
      inputTitle !== "" &&
      inputAmount !== "" &&
      inputTitle !== null &&
      inputAmount !== null &&
      options !== undefined
    ) {
      props.data.push({
        title: props.title,
        icons: icons,
        id: props.data.length + 1,
        name: inputTitle,
        amount: inputAmount,
        count: 0,
        opt: options,
      });

      setinputAmount("");
      setInputTitle("");
      setActiveModal2(false);
    }
    incomeAmountCounter();
    props.rerenderTree();
  }

  return (
    <div className={s.block}>
      <div className={s.header}>
        <div className={s.title}>
          <div>Доходы</div>
          <div className={s.data}>март 2023</div>
        </div>

        <div className={s.budget}>
          <div className={s.status}>
            <div>{incomeMoney} T</div>
            <div className={s.stat_text}>Получено</div>
          </div>

          <div className={s.status}>
            <div>{amounts} T</div>
            <div className={s.stat_text}>Бюджет доходов</div>
          </div>
        </div>
      </div>

      <div className={s.main}>
        <div className={s.main_inner}>
          {props.data.map((item) =>
            item.title === "Income" ? (
              <div key={item.id} className={s.main_block}>
                <div className={s.block_title}>{item.name}</div>
                <div>{item.inp}</div>
                <div className={s.icon_edit}>
                  <img
                    src="/img/edit.png"
                    className={s.edit}
                    onClick={() => {
                      setActiveModal(true);
                      setId(item.id);
                    }}
                  />

                 <div className={item.count>item.amount? s.redcircle:s.circle}> <img className={s.icon} src={`/img/${item.icons}`} /></div>
                </div>

                <div className={s.block_info}>
                  <div className={s.block_edit}>{item.count} {item.opt}</div>
                  <div
                    className={`${item.amount == 0 ? s.disable : ""} ${
                      s.block_amount
                    }`}
                  >
                    {item.amount + " " + item.opt}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}

          <Newblock>
            <div>
              <div className={s.new_block}>
                <img
                  onClick={() => setActiveModal2(true)}
                  src="/img/new.png"
                  className={s.newblock}
                />
              </div>

              <Modal
                defaultIconsIncome={props.defaultIconsIncome}
                setIcons={setIcons}
                active={activeModal2}
                setActive={setActiveModal2}
              >
                <div className={s.modal}>
                  <div className={s.modal_left}>
                    <div className={s.modal_header}>
                      <div className={s.modal_top}>
                        <input
                          className={s.input_style}
                          placeholder="Откуда"
                          value={inputTitle}
                          onChange={(e) => setInputTitle(e.target.value)}
                          type="text"
                        />
                        <img className={s.icons_choose} src={`/img/${icons}`} />
                      </div>

                      <input
                        className={s.input_style}
                        placeholder="Планируете"
                        value={inputAmount}
                        onChange={(e) => setinputAmount(e.target.value)}
                        type="number"
                      />

                      <div className={s.modal_valute}>
                        <div>Валюта</div>

                        <select
                          className={s.select_style}
                          onChange={(e) => setOptions(e.target.value)}
                        >
                          <option selected disabled className={s.opt_style} >
                          ▼
                          </option>
                          <option className={s.opt_style} value={"RUB"}>
                            RUB
                          </option>
                          <option className={s.opt_style} value={"KZT"}>
                            KZT
                          </option>
                          <option className={s.opt_style} value={"EUR"}>
                            EUR
                          </option>
                        </select>
                      </div>
                    </div>
                    <button className={s.addbtn} onClick={addBlock}>
                      Добавить
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </Newblock>
        </div>
      </div>

      <Modal
        defaultIconsIncome={props.defaultIconsIncome}
        setIcons={setIcons}
        active={activeModal}
        setActive={setActiveModal}
      >
        <div className={s.modal}>
          <div className={s.modal_left}>
            
              <div className={s.modal_top}>
              <div className={s.modal_header}>
                <input
                  placeholder="Изменить"
                  className={s.input_style}
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  type="text"
                />

                
              </div>
              <img className={s.icons_choose} src={`/img/${icons}`} />
            </div>
            <div className={s.modal_main}>
              <div className={s.modal_header}>
              <input
                placeholder="Изменить"
                className={s.input_style}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="number"
              />
              </div>
              

              {deleteOpt ? (
                <div>
                  <button className={s.addbtn} onClick={() => edits(ids)}>
                    Изменить
                  </button>
                  <button
                    className={s.addbtn}
                    onClick={(e) => setDeleteOpt(false)}
                  >
                    Удалить
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className={s.addbtn}
                    onClick={(e) => setDeleteOpt(true)}
                  >
                    Отмена
                  </button>
                  <button className={s.addbtn} onClick={() => deleteItems(ids)}>
                    Удалить все
                  </button>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Income;
