import { useEffect } from "react";

const easeInOutQuint = (t) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;

export const useSmoothScroll = (options = {}) => {
  useEffect(() => {
    const {
      duration = 1200,
      easing = easeInOutQuint,
      offset = 0,
      disableOnReduceMotion = true,
    } = options;

    const handleClick = async (e) => {
      // Проверяем, является ли элемент якорной ссылкой
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      // Ищем целевой элемент
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Проверка prefers-reduced-motion
      if (
        disableOnReduceMotion &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        window.location.hash = href;
        return;
      }

      // Получаем позиции
      const startPos = window.pageYOffset;
      const targetRect = target.getBoundingClientRect();
      const targetPos = targetRect.top + startPos - offset;
      const distance = targetPos - startPos;

      // Запускаем анимацию
      let startTime = null;

      const animateScroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startPos + distance * easing(progress));

        if (timeElapsed < duration) {
          window.requestAnimationFrame(animateScroll);
        } else {
          window.history.pushState(null, null, href);
        }
      };

      window.requestAnimationFrame(animateScroll);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [
    options.duration,
    options.easing,
    options.offset,
    options.disableOnReduceMotion,
  ]);
};
