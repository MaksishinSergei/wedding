import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function Guests() {
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

  return (
    <section id="invite" className="geusts">
      <div className="container">
        <div
          ref={myElementRef}
          className={`guests__wrapper ${isVisible ? "visible" : ""}`}
        >
          <h2 className="title guests__title">Дорогие родные и близкие</h2>
          <div className="guests__text-wrapper">
            <p className="guests__text guests__text-1">
              Совсем скоро в нашей жизни предстоят счастливые перемены!
            </p>
            <p className="guests__text guests__text-2">
              Мы хотим, чтобы в этот особенный день рядом с нами были самые
              близкие и дорогие для нас люди!
            </p>
            <p className="guests__text guests__text-3">
              Мы приглашаем Вас провести с нами этот незабываемый день –
            </p>
            <p className="guests__text guests__text-4">день нашей свадьбы!</p>
          </div>
          <div className="guests__date">
            <p className="guests__date-day">суббота</p>
            <div className="guests__date-date">
              <p className="date__number-day">02</p>
              <p className="date__month">августа</p>
              <p className="date__year">2025</p>
            </div>
            <p className="guests__date-time">00:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
