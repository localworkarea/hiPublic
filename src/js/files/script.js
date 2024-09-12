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
  smoothScroll(0.08, 0.9);
}



// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    
    gsap.registerPlugin(ScrollTrigger)


    // == SPLIT TYPE =========================================================
    const splitTextLines = document.querySelectorAll('.split-lines');
    const splitTextWords = document.querySelectorAll('.split-words');
    const splitTextChars = document.querySelectorAll('.split-chars');
    const splitTextBoth = document.querySelectorAll('.split-both');
    const splitSetSpan = document.querySelectorAll('.split-words.set-span');
    
    function initSplitType() {
      // Если существуют элементы с классом .split-lines
      if (splitTextLines.length > 0) {
        splitTextLines.forEach(element => {
          new SplitType(element, { types: 'lines' });
        });
      }
    
      // Если существуют элементы с классом .split-words
      if (splitTextWords.length > 0) {
        splitTextWords.forEach(element => {
          new SplitType(element, { types: 'words' });

          // Проставляем индексы для всех слов
          const words = element.querySelectorAll('.word');
          words.forEach((word, index) => {
            word.style.setProperty('--index', index);
          });
        });
      }
    
      // Если существуют элементы с классом .split-chars
      if (splitTextChars.length > 0) {
        splitTextChars.forEach(element => {
          new SplitType(element, { types: 'chars' });

          const chars = element.querySelectorAll('.char');
          chars.forEach((char, index) => {
            char.style.setProperty('--index', index);
          });
        });
      }
    
      // Если существуют элементы с классом .split-both
      if (splitTextBoth.length > 0) {
        splitTextBoth.forEach(element => {
          new SplitType(element, { types: 'lines, words' });

          // Проставляем индексы для всех слов
          const words = element.querySelectorAll('.word');
          words.forEach((word, index) => {
            word.style.setProperty('--index', index);
          });
        });
      }

      // Добавляем <span> для каждого слова внутри .split-words.set-span
      if (splitSetSpan.length > 0) {
        splitSetSpan.forEach(splitSetSpan => {
          const words = splitSetSpan.querySelectorAll('.word');
          
          words.forEach(word => {
            const text = word.textContent.trim();
            word.innerHTML = `<span class="word-span">${text}</span>`;
          });
        });
      }
    }
    
    // Инициализация SplitType при загрузке
    initSplitType();
    
    // Создаем ResizeObserver для отслеживания изменений размера окна
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        initSplitType();
      });

      // oтслеживаем рисайз для функции updateMargin()
      updateMargin();
      
    });
    // Наблюдаем за изменениями в элементе body (можно выбрать другой контейнер, если нужно)
    resizeObserver.observe(document.body);

    // =======================================================================




    // Функция для обновления отступа
    function updateMargin() {
        const main = document.querySelector('.page');
        const footer = document.querySelector('.footer');
    
        if (main && footer) {
            const footerHeight = footer.offsetHeight;
            main.style.marginBottom = `${footerHeight}px`; // Устанавливаем отступ в пикселях
        }
    }


    // Функция для пересчета и обновления анимации футера
    function updateAnimation() {
        const main = document.querySelector('.page');
        const lastSection = main.lastElementChild;
        const footer = document.querySelector('.footer');
        const footerHeight = footer.offsetHeight;


        // clearSpecificScrollTriggers();


        gsap.set(footer, { yPercent: 60, opacity: 0, immediateRender: true });
        gsap.to(footer, {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: lastSection,
                start: "bottom bottom",
                end: `+=${footerHeight}`, 
                scrub: true,
                immediateRender: false,
            },
        });

        const heroSection = document.querySelector('.hero');
        const heroWrapper = document.querySelector('.hero__wrapper');

        if (heroSection) {
            gsap.to(heroWrapper, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top", 
                    end: "bottom top", 
                    scrub: true,
                },
            });
        }

        const influencerSection = document.querySelector('.influencers');
        const influencerTitle  = document.querySelectorAll('.influencers__title');
        const influencerWords  = document.querySelectorAll('.influencers__title span');
        const influencerContainer  = document.querySelector('.influencers__container');
        
        if (influencerSection) {
            gsap.set(influencerSection, { scale: 0.8, immediateRender: true });
            gsap.to(influencerSection, {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: influencerSection,
                    start: "top bottom",
                    end: "top 80%", 
                    scrub: 1,
                    immediateRender: false,
                },
            });
             // Анимация для элементов .word
            gsap.set(influencerWords, {  transform: 'translate(0%, 100%)',});
            gsap.to(influencerWords, {
               transform: 'translate(0%, 0%)',
                ease: "power4.out",
                // duration: 0.65,
                scrollTrigger: {
                    trigger: influencerTitle,
                    start: "top bottom",
                    end: "top center",
                    scrub: true,
                },
            });
            gsap.to(influencerContainer, {
                transform: 'translate(0%, -100px)',
                ease: "none",
                scrollTrigger: {
                    trigger: influencerContainer,
                    start: "bottom bottom",
                    end: "bottom top", 
                    scrub: 1,
                },
            });
        }

        const partnersSection  = document.querySelector('.partners');
        const partnersContainer  = document.querySelector('.partners__container');
        if (partnersSection) {
            gsap.to(partnersContainer, {
                transform: 'translate(0%, -100px)',
                ease: "none",
                scrollTrigger: {
                    trigger: partnersContainer,
                    start: "top center",
                    end: "bottom top", 
                    scrub: 1,
                },
            });
        }
        const teamSection  = document.querySelector('.team');
        const teamContainer  = document.querySelector('.team__container');
        if (teamSection) {
            gsap.to(teamContainer, {
                transform: 'translate(0%, -100px)',
                ease: "none",
                scrollTrigger: {
                    trigger: teamContainer,
                    start: "top center",
                    end: "bottom top", 
                    scrub: 1,
                },
            });
        }



    }

    //  // Функция для удаления триггеров
    //  function clearSpecificScrollTriggers() {
    //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    //     ScrollTrigger.refresh();
    // }

    // // Функция для вызова обновления после завершения изменения размера
    // function callAfterResize(func, delay) {
    //     let dc = gsap.delayedCall(delay || 0.2, func).pause(),
    //         handler = () => dc.restart(true);
    //     window.addEventListener("resize", handler);
    //     return handler; 
    // }

    updateMargin();
    updateAnimation();

    // Добавляем обработку события resize с задержкой для футера и heroWrapper
    // const resizeHandler = callAfterResize(() => {
        // updateAnimation();
    // });


});

function changeOrientation() {
      location.reload();
}
window.addEventListener('orientationchange', changeOrientation);