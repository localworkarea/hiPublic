// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// 1. ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ =========================

// 1. Добавить к тегу body на странице атрибут data-smooth-scroll="true"
// 2. Вставить следующий код в скрипт
// 3. Настройка плавного скролла будет осуществляться в изменении параметров в вызове функции smoothScroll(0.08, 0.85);

function smoothScroll(smoothness = 0.08, inertia = 0.85) {
  let scrollPosition = window.pageYOffset;
  let targetPosition = scrollPosition;
  let isScrolling = false;
  let isDraggingScrollbar = false;

  function updateScroll() {
      scrollPosition += (targetPosition - scrollPosition) * smoothness;
      window.scrollTo(0, scrollPosition);

      if (Math.abs(targetPosition - scrollPosition) > 0.5) {
          requestAnimationFrame(updateScroll);
      } else {
          isScrolling = false;
      }
  }

  function startScroll(event) {
      if (!isDraggingScrollbar) {
          targetPosition += event.deltaY * inertia;
          targetPosition = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetPosition));
          event.preventDefault();

          if (!isScrolling) {
              isScrolling = true;
              requestAnimationFrame(updateScroll);
          }
      }
  }

  function onScroll() {
      if (!isScrolling) {
          scrollPosition = window.pageYOffset;
          targetPosition = scrollPosition;
      }
  }

  function onMouseDown() {
      isDraggingScrollbar = true;
  }

  function onMouseUp() {
      isDraggingScrollbar = false;
      scrollPosition = window.pageYOffset;
      targetPosition = scrollPosition;
  }

  function initSmoothScroll() {
      if (document.body.getAttribute('data-smooth-scroll') === 'true') {
          window.addEventListener('wheel', startScroll, { passive: false });
          window.addEventListener('scroll', onScroll);
          window.addEventListener('mousedown', onMouseDown);
          window.addEventListener('mouseup', onMouseUp);
      } else {
          window.removeEventListener('wheel', startScroll);
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('mousedown', onMouseDown);
          window.removeEventListener('mouseup', onMouseUp);
      }
  }

  const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-smooth-scroll') {
              initSmoothScroll();
          }
      });
  });

  observer.observe(document.body, { attributes: true });

  initSmoothScroll();
}

if (document.body.getAttribute('data-smooth-scroll') === 'true') {
  smoothScroll(0.08, 0.85);
}



// ========================================================
