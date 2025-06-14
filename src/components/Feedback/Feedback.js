import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import "./style.css";

export default function Feedback() {
  const [isComing, setComing] = useState(null);
  const [isTextContent, setTextContent] = useState("");
  const [isNameContent, setNameContent] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [showPlaceholderArea, setShowPlaceholderArea] = useState(true);
  const [isValid, setValid] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    coming: "",
    text: "",
    agreement: "",
  });
  const myElementRef = useRef(null);

  const handleComingChange = (value) => {
    setComing(value);
  };
  const handleFocusArea = () => {
    setShowPlaceholderArea(false);
  };

  const handleBlurArea = () => {
    if (isTextContent === "") {
      setShowPlaceholderArea(true);
    }
  };

  const CheckForm = () => {
    if (isNameContent !== "" && isComing !== null && isChecked) {
      setValid(true);
      const formData = {
        name: isNameContent,
        coming: isComing,
        text: isTextContent,
        agreement: `Я, ${isNameContent}, даю свое согласие на обработку персональных данных `,
      };
      console.log("Форма валидна, отправляем данные:", formData);

      handleSubmit({ preventDefault: () => {} }, formData);
      setForm(formData);
    } else {
      setValid(false);
      notifications.show({
        title: "Ошибка!",
        message: "Пожалуйста, заполните все обязательные поля",
        color: "red",
        withBorder: true,
      });
    }
  };

  const handleSubmit = async (e, formData = form) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    try {
      const response = await axios.post(
        "http://217.114.13.140:3001/send-to-telegram",
        formData
      );

      if (response.data.success) {
        notifications.show({
          title: "Подтверждение отправлено!",
          message: "До скорой встречи",
          color: "green",
          withBorder: true,
        });
      }
    } catch (error) {
      notifications.show({
        title: "Ошибка отправки!",
        message: "Что-то пошло не так",
        color: "red",
        withBorder: true,
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Параметры наблюдения
    );

    if (myElementRef.current) {
      observer.observe(myElementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={myElementRef}
      className={`feedback ${isVisible ? "visible" : ""}`}
    >
      <div className="container">
        <div className="feedback__wrapper">
          <h2 className="title feedback__title">Подтверждение</h2>
          <div className="form__wrapper">
            <p className="text form__subtitle">
              Мы будем очень признательны, если вы сообщите нам о вашем решении
              до 00 июля 2025 года
            </p>
            <div
              className={`form__fio-wrapper ${
                isNameContent === "" && isValid === false ? "required" : ""
              }`}
            >
              <input
                type="text"
                value={isNameContent}
                onChange={(e) => setNameContent(e.target.value)}
                className="input__fio"
              />
              <span className="input__fio-msg">
                Пожалуйста, введите Ваше имя
              </span>
            </div>
            <div
              className={`form__radio-btn ${
                isComing === null && isValid === false ? "required" : ""
              }`}
            >
              <div className="radio__buttons-group">
                <p className="radio__buttons-subtitle">
                  Подтвердите ваше присутствие:
                </p>
                <RadioButton
                  label=" Обязательно буду!"
                  name="isComing"
                  value="Обязательно буду!"
                  checked={isComing === "Обязательно буду!"}
                  onChange={() => handleComingChange("Обязательно буду!")}
                />
                <RadioButton
                  label=" К сожалению, не смогу присутствовать"
                  name="isComing"
                  value="К сожалению, не смогу присутствовать"
                  checked={isComing === "К сожалению, не смогу присутствовать"}
                  onChange={() =>
                    handleComingChange("К сожалению, не смогу присутствовать")
                  }
                />
              </div>

              <span className="input__radio-msg">
                Пожалуйста, подтвердите Ваше присутствие
              </span>
            </div>
            <div className="form__textarea-wrapper">
              <textarea
                value={isTextContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={10}
                cols={30}
                onFocus={handleFocusArea}
                onBlur={handleBlurArea}
                placeholder={
                  showPlaceholderArea
                    ? "Введите здесь тех, кто придет с вами (имя и фамилия)..."
                    : ""
                }
                className="form__text-area"
              />
            </div>
            <div
              className={`form__checkbox-wrapper ${
                isChecked === false && isValid === false ? "required" : ""
              }`}
            >
              <CheckBox
                checked={isChecked}
                onChange={(e) => setChecked(e.target.checked)}
                label=" Я даю свое согласие на "
              />
              <span className="input__checkbox-msg">
                Необходимо Ваше согласие на обработку персональных данных
              </span>
            </div>
            <button onClick={CheckForm} type="button" className="form__btn">
              Отправить
            </button>
          </div>
          <h2 className="title end__title">С нетерпением ждем вас</h2>
        </div>
      </div>
    </section>
  );
}
function RadioButton({ label, name, value, checked, onChange }) {
  return (
    <label className="radio__button">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
function CheckBox({ checked, onChange, label }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form__input-checkbox"
      />
      {label}
      <br />
      <Link to="/processing" className="link__pdn">
        обработку персональных данных
      </Link>
    </label>
  );
}
