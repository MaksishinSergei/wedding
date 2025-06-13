import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function Location() {
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
    <section
      ref={myElementRef}
      className={`location ${isVisible ? "visible" : ""}`}
    >
      <h2 className="title location__title">Место проведения</h2>
      <img
        src="./image/logo_zaseka.svg"
        alt="Засека"
        className="location__logo"
      />
      <div className="location__wrap-subtitle">
        <h3 className="title location__subtitle">Ресторан</h3>
        <h3 className="title location__subtitle">Засека</h3>
      </div>
      <div className="location__inner">
        <div className="container">
          <div className="location__wrapper">
            <video className="videoTag" autoPlay loop muted>
              <source src="./image/zaseka.mp4" type="video/mp4" />
            </video>
            <div className="location__overlay"></div>
            <div className="location__content">
              <p className="location__text-1">
                Нашу свадьбу мы решили провести в живописном месте,
              </p>
              <p className="location__text-2">Ресторане «Засека»</p>
              <p className="location__address">Адрес:</p>
              <p className="location__address-text">
                г.Пенза, ул. Совхоз-техникум, 55
              </p>
              <div className="location__map">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab5a3af36804c79668f7ca3c4de0c6a2706c88890a8ac2460c5b57d2b65f26e6f&amp;source=constructor"
                  width="320"
                  height="240"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
