import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function Timing() {
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
    <section className="timing">
      <div className="container">
        <div
          ref={myElementRef}
          className={`timing__wrapper ${isVisible ? "visible" : ""}`}
        >
          <h2 className="title timing__title">Программа дня</h2>
          <ul className="timing__list">
            <li className="timing__list-item item-1">Событие</li>
            <li className="timing__list-item wheat-1 wheat-item">
              <img
                src="./image/wheat_timing.png"
                alt=""
                className="timing__list-image"
              />
            </li>
            <li className="timing__list-item item-2">Событие</li>
            <li className="timing__list-item wheat-2 wheat-item">
              <img
                src="./image/wheat_timing.png"
                alt=""
                className="timing__list-image mirror"
              />
            </li>
            <li className="timing__list-item item-3">Событие</li>
            <li className="timing__list-item wheat-3 wheat-item">
              <img
                src="./image/wheat_timing.png"
                alt=""
                className="timing__list-image"
              />
            </li>
            <li className="timing__list-item item-4">Событие</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
