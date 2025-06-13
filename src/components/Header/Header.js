import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const myElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Параметры наблюдения
    );

    if (myElementRef.current) {
      observer.observe(myElementRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const scrollToGuests = (e) => {
    e.preventDefault();
    const guestsSection = document.getElementById("invite");

    if (guestsSection) {
      guestsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <header ref={myElementRef} className="header">
      <div className="container">
        <div className={`header_logo ${isVisible ? "visible" : ""}`}>
          <img
            src="./image/monogramm.svg"
            alt="Ангелина&Сергей"
            className="logo"
          />
        </div>
        <div className={`content ${isVisible ? "visible" : ""}`}>
          <h1 className="title header_title">Дорогие гости</h1>
          <div className="bride_wrapper-text">
            <img
              src="./image/wheat.png"
              alt="Колосок"
              className="wheat wheat-left"
            />
            <div className="text_wrapper">
              <p className="title question">Невеста</p>
              <p className="title text">Ангелина</p>
            </div>
          </div>
          <img
            src="/image/main-image.png"
            alt="Это мы)"
            className="main_image"
          />
          <div className="groom_wrapper-text">
            <div className="text_wrapper">
              <p className="title question">Жених</p>
              <p className="title text">Сергей</p>
            </div>
            <img
              src="./image/wheat.png"
              alt="Колосок"
              className="wheat wheat-right"
            />
          </div>
          <img
            src="./image/second_image.png"
            alt="Это тоже мы)"
            className="second_image"
          />
          <h2 className="title header_subtitle">
            Мы приглашаем вас на свадьбу
          </h2>
          <a className="arrow" href="#invite" onClick={scrollToGuests}>
            <svg
              width="16"
              height="27"
              viewBox="0 0 16 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1C9 0.447715 8.55228 -2.41411e-08 8 0C7.44772 2.41411e-08 7 0.447715 7 1L9 1ZM7.29289 26.7071C7.68342 27.0976 8.31658 27.0976 8.70711 26.7071L15.0711 20.3431C15.4616 19.9526 15.4616 19.3195 15.0711 18.9289C14.6805 18.5384 14.0474 18.5384 13.6569 18.9289L8 24.5858L2.34315 18.9289C1.95262 18.5384 1.31946 18.5384 0.928933 18.9289C0.538409 19.3195 0.538409 19.9526 0.928933 20.3431L7.29289 26.7071ZM8 1L7 1L7 26L8 26L9 26L9 1L8 1Z"
                fill="black"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
