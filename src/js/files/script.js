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
    
    gsap.registerPlugin(ScrollTrigger);

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
    
    // // Создаем ResizeObserver для отслеживания изменений размера окна
    // const resizeObserver = new ResizeObserver(entries => {
    //   entries.forEach(entry => {
    //     initSplitType();
    //   });

    //   // oтслеживаем рисайз для функции updateMargin()
    //   updateMargin();
      
    // });
    // // Наблюдаем за изменениями в элементе body (можно выбрать другой контейнер, если нужно)
    // resizeObserver.observe(document.body);

    // Создаем ResizeObserver для отслеживания изменений размера окна
    let lastWidth = document.body.clientWidth; // Запоминаем начальную ширину
    
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const currentWidth = entry.contentRect.width; // Получаем текущую ширину
      
        if (currentWidth !== lastWidth) { // Проверяем, изменилась ли ширина
          lastWidth = currentWidth; // Обновляем ширину
        
          // Вызовите ваши функции только если изменилась ширина
          initSplitType();
        
          // Отслеживаем рисайз для функции updateMargin()
          updateMargin();
        }
      });
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


        clearSpecificScrollTriggers();


        gsap.set(footer, { yPercent: 60, opacity: 0 });
        gsap.to(footer, {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: lastSection,
                start: "bottom bottom",
                end: `+=${footerHeight}`, 
                scrub: true,
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
        const influencerContainer  = document.querySelector('.influencers__container');
        const partnersSection  = document.querySelector('.partners');
        const partnersContainer  = document.querySelector('.partners__container');
        const teamSection  = document.querySelector('.team');
        const teamContainer  = document.querySelector('.team__container');

        let breakPoint = 30.061;
        let mm = gsap.matchMedia();
  
        mm.add({
          isDesktop: `(min-width: ${breakPoint}em)`,
          isMobile: `(max-width: ${breakPoint}em)`
        }, (context) => {
        
          let {isDesktop, isMobile} = context.conditions;
        
          if (isDesktop) {
            
            if (influencerSection) {
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


          if (isMobile) {}

        });
        



    }

     // Функция для удаления триггеров
     function clearSpecificScrollTriggers() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.refresh();
    }

    // // Функция для вызова обновления после завершения изменения размера
    // function callAfterResize(func, delay) {
    //     let dc = gsap.delayedCall(delay || 0.2, func).pause(),
    //         handler = () => dc.restart(true);
    //     window.addEventListener("resize", handler);
    //     return handler; 
    // }

    // updateMargin();
    // updateAnimation();

    // Добавляем обработку события resize с задержкой для футера и heroWrapper
    // const resizeHandler = callAfterResize(() => {
    //     updateAnimation();
    // });

    function callAfterResize(func, delay) {
      let dc = gsap.delayedCall(delay || 0.2, func).pause(),
          lastWindowWidth = window.innerWidth; // Запоминаем текущую ширину
  
      const handler = () => {
          const currentWindowWidth = window.innerWidth;
          if (currentWindowWidth !== lastWindowWidth) {
              dc.restart(true); // Перезапускаем задержку и вызываем функцию только если ширина изменилась
              lastWindowWidth = currentWindowWidth; // Обновляем ширину
          }
      };
  
      window.addEventListener("resize", handler);
      return handler;
    }

    updateMargin();
    updateAnimation();

    const resizeHandler = callAfterResize(() => {
        updateAnimation(); // Ваша функция обновления анимации
    });
  


});

// function stopOverscroll(element) {
//     element = gsap.utils.toArray(element)[0] || window;
//     (element === document.body || element === document.documentElement) &&
//       (element = window);
//     let lastScroll = 0,
//       lastTouch,
//       forcing,
//       forward = true,
//       isRoot = element === window,
//       scroller = isRoot ? document.scrollingElement : element,
//       ua = window.navigator.userAgent + "",
//       getMax = isRoot
//         ? () => scroller.scrollHeight - window.innerHeight
//         : () => scroller.scrollHeight - scroller.clientHeight,
//       addListener = (type, func) =>
//         element.addEventListener(type, func, { passive: false }),
//       revert = () => {
//         scroller.style.overflowY = "auto";
//         forcing = false;
//       },
//       kill = () => {
//         forcing = true;
//         scroller.style.overflowY = "hidden";
//         !forward && scroller.scrollTop < 1
//           ? (scroller.scrollTop = 1)
//           : (scroller.scrollTop = getMax() - 1);
//         setTimeout(revert, 1);
//       },
//       handleTouch = (e) => {
//         let evt = e.changedTouches ? e.changedTouches[0] : e,
//           forward = evt.pageY <= lastTouch;
//         if (
//           ((!forward && scroller.scrollTop <= 1) ||
//             (forward && scroller.scrollTop >= getMax() - 1)) &&
//           e.type === "touchmove"
//         ) {
//           e.preventDefault();
//         } else {
//           lastTouch = evt.pageY;
//         }
//       },
//       handleScroll = (e) => {
//         if (!forcing) {
//           let scrollTop = scroller.scrollTop;
//           forward = scrollTop > lastScroll;
//           if (
//             (!forward && scrollTop < 1) ||
//             (forward && scrollTop >= getMax() - 1)
//           ) {
//             e.preventDefault();
//             kill();
//           }
//           lastScroll = scrollTop;
//         }
//       };
//     if ("ontouchend" in document && !!ua.match(/Version\/[\d\.]+.*Safari/)) {
//       addListener("scroll", handleScroll);
//       addListener("touchstart", handleTouch);
//       addListener("touchmove", handleTouch);
//     }
//     scroller.style.overscrollBehavior = "none";
//   }
//   stopOverscroll();


// function changeOrientation() {
//       location.reload();
// }
// window.addEventListener('orientationchange', changeOrientation);