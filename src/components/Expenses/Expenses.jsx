import React, { useState } from "react";
import s from "./Expenses.module.css";
import { v4 as uuidv4 } from "uuid";
import Modal from "../Modal/Modal";
import Newblock from "../New/Newblock";
const Expenses = (props) => {
  const [activeModal2, setActiveModal2] = useState(false);
  const [modalTitle2, setModalTitle2] = useState("");
  const [inputAmount, setinputAmount] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const [value, setValue] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [deleteOpt, setDeleteOpt] = useState(true);
  const [ids, setId] = useState("");
  const [options, setOptions] = useState("");
  const [amounts, setAmounts] = useState(0);
  const [icons, setIcons] = useState("books.png");

  let plane = 0;
  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].title === "Expenses" && props.data[i].amount != 0) {
      plane += props.data[i].amount - props.data[i].count;
    }
  }
  let waste = 0;
  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].title === "Expenses") {
      waste += props.data[i].count;
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
          props.data[i].amount = parseFloat(value);
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
      if (props.data[i].title == "Expenses") {
        counter += parseFloat(props.data[i].amount);
      }
    }

    setAmounts(counter);
  }

  function addBlock() {
    if (
      modalTitle2 !== "" &&
      inputAmount !== "" &&
      modalTitle2 !== null &&
      inputAmount !== null &&
      options !== undefined
    ) {
      props.data.push({
        title: props.title,
        icons: icons,
        id: props.data.length + 1,
        name: modalTitle2,
        amount: parseFloat(inputAmount),
        count: 0,
        opt: options,
      });

      setinputAmount("");
      setModalTitle2("");
      setActiveModal2(false);
    }
    incomeAmountCounter();
    props.rerenderTree();
  }
  return (
    <div className={s.block}>
      <div className={s.header}>
        <div className={s.title}>
          <div>Расходы</div>
          <div className={s.data}>март 2023</div>
        </div>

        <div className={s.budget}>
          <div className={s.status}>
            <div>{waste} T</div>
            <div className={s.stat_text}>Потрачено</div>
          </div>

          <div className={s.status}>
            <div>{amounts}</div>
            <div className={s.stat_text}>Бюджет доходов</div>
          </div>

          <div className={s.status}>
            <div>{plane} T</div>
            <div className={s.stat_text}>В планах</div>
          </div>

          <div className={s.status}>
            <div>CКОРО</div>
            <div className={s.stat_text}>прогноз расходов</div>
          </div>
        </div>
      </div>

      <div className={s.main}>
        <div className={s.main_inner}>
          {props.data.map((item) =>
            item.title === "Expenses" ? (
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
                 <div className={item.count>item.amount? s.redcircle:s.circle}><img className={s.icon} src={`/img/${item.icons}`} /></div>
                </div>

                <div className={s.block_info}>
                  <div className={s.block_edit}>{item.count} {item.opt}</div>
                  <div
                    className={`${item.amount == 0 ? s.disable : ""} ${
                      s.block_amount
                    }`}
                  >
                    {item.amount + " " + item.opt} T
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
                          value={modalTitle2}
                          onChange={(e) => setModalTitle2(e.target.value)}
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

export default Expenses;
