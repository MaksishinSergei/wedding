import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function Dress() {
  const [isVisible, setIsVisible] = useState(false);
  const myElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = myElementRef.current;
    if (element) {
      // Ждём загрузки всех изображений
      Promise.all(
        Array.from(element.querySelectorAll("img")).map(
          (img) =>
            img.complete || new Promise((resolve) => (img.onload = resolve))
        )
      ).then(() => {
        observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={myElementRef}
      className={`dress ${isVisible ? "visible" : ""}`}
    >
      <div className="container">
        <div r className="dress__wrapper">
          <h2 className="title dress__title">Дресс-код</h2>
          <div className="dress__text">
            <p className="text dress__text-1">
              Для нас главное – ваше присутствие!
            </p>
            <p className="text dress__text-2">
              Но мы будем очень рады, если вы поддержите цветовую гамму нашей
              свадьбы
            </p>
            <p className="text dress__text-3">
              Чуть ниже будут примеры образов для прекрасных дам и мужчин
            </p>
          </div>
          <h2 className="title dress__title-men">Мужчины</h2>
          <div className="dress__color">
            <img
              src="./image/white.png"
              alt=""
              className="dress__color-img color_1"
            />
            <img
              src="./image/black.png"
              alt=""
              className="dress__color-img color_1"
            />
          </div>
          <div className="dress__men">
            <div className="dress__men-col dress__men-col-1">
              <img
                src="./image/man_1.png"
                alt=""
                className="dress__men-img img_1"
              />

              <img
                src="./image/man_2.png"
                alt=""
                className="dress__men-img img_2"
              />
            </div>
            <div className="dress__men-col dress__men-col-2">
              <img
                src="./image/man_4.png"
                alt=""
                className="dress__men-img img_4"
              />
              <img
                src="./image/man_3.png"
                alt=""
                className="dress__men-img img_3"
              />
            </div>
          </div>
          <h2 className="title dress__title-women">Женщины</h2>
          <div className="dress__color">
            <img
              src="./image/light_green.png"
              alt=""
              className="dress__color-img color_1"
            />
            <img
              src="./image/light_brown.png"
              alt=""
              className="dress__color-img color_2"
            />
            <img
              src="./image/brown.png"
              alt=""
              className="dress__color-img color_2"
            />
            <img
              src="./image/green.png"
              alt=""
              className="dress__color-img color_1"
            />
          </div>
          <div className="dress__women">
            <div className="dress_women-col-1">
              <img
                src="./image/women_1.png"
                alt=""
                className="dress_women-img img_1"
              />
            </div>
            <div className="dress_women-col-2">
              <img
                src="./image/women_2.png"
                alt=""
                className="dress__women-img img_2"
              />
              <img
                src="./image/women_3.png"
                alt=""
                className="dress__women-img img_3"
              />
              <img
                src="./image/women_4.png"
                alt=""
                className="dress__women-img img_4"
              />
            </div>
            <div className="dress_women-col-3">
              <img
                src="./image/women_5.png"
                alt=""
                className="dress__women-img img_5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
