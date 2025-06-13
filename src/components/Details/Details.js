import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import "./style.css";
import envelopeAnimation from "./envelopeAnimation.json";
import bottleAnimation from "./bottleAnimation.json";

export default function Details() {
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
      className={`details ${isVisible ? "visible" : ""}`}
    >
      <div className="container">
        <div className="details__wrapper">
          <h2 className="title details__title">Детали</h2>
          <div className="details__text-wrap">
            <Lottie
              animationData={envelopeAnimation}
              loop={true}
              className="details__text-letter"
            />
            <p className="text details__text-1">
              Дорогие гости, приносите с собой веселье и радость в душе, а
              подарки в конверте
            </p>
            <Lottie
              animationData={bottleAnimation}
              loop={true}
              className="details__text-bottle"
            />
            <p className="text details__text-2">
              Также просим Вас воздержаться от покупки цветов и подарить нам Ваш
              любимый напиток, который мы позже откроем с хорошими
              воспоминаниями об этом дне
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
