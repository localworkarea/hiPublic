// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// 1. ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ =========================

// 1. Добавить к тегу body на странице атрибут data-smooth-scroll="true"
// 2. Вставить следующий код в скрипт
// 3. Настройка плавного скролла будет осуществляться в изменении параметров в вызове функции smoothScroll(0.08, 0.85);

function smoothScroll(smoothness = 0.1, inertia = 0.9) {
  let scrollPosition = window.pageYOffset; // Текущая позиция скролла
  let targetPosition = scrollPosition; // Целевая позиция скролла
  let isScrolling = false; // Флаг для отслеживания состояния скролла
  let isDraggingScrollbar = false; // Флаг для отслеживания состояния перетаскивания ползунка

  function updateScroll() {
    // Рассчитываем смещение
    scrollPosition += (targetPosition - scrollPosition) * smoothness;

    // Обновляем скролл окна
    window.scrollTo(0, scrollPosition);

    // Проверяем, нужно ли продолжать анимацию
    if (Math.abs(targetPosition - scrollPosition) > 0.5) {
      requestAnimationFrame(updateScroll);
    } else {
      isScrolling = false; // Останавливаем анимацию
    }
  }

  // Отслеживаем прокрутку мышью или точпадом
  window.addEventListener('wheel', function(event) {
    if (!isDraggingScrollbar) {
      targetPosition += event.deltaY; // Обновляем целевую позицию

      // Ограничиваем целевую позицию в пределах документа
      targetPosition = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetPosition));

      event.preventDefault(); // Предотвращаем стандартное поведение скролла

      // Если не прокручивается, запускаем анимацию
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
    }
  }, { passive: false });

  // Отслеживаем начало и конец перетаскивания ползунка скроллбара
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      scrollPosition = window.pageYOffset;
      targetPosition = scrollPosition;
    }
  });

  window.addEventListener('mousedown', function() {
    isDraggingScrollbar = true;
  });

  window.addEventListener('mouseup', function() {
    isDraggingScrollbar = false;
    scrollPosition = window.pageYOffset;
    targetPosition = scrollPosition;
  });
}

if (document.body.getAttribute('data-smooth-scroll') === 'true') {
  smoothScroll(0.08, 0.85);
}

// ========================================================
