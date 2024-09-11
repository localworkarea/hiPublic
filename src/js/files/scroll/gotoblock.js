// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, menuClose, getHash, FLS } from "../functions.js";
// Підключення доповнення для збільшення можливостей
// Документація: https://github.com/cferdinandi/smooth-scroll
import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавної проктутки до блоку
// export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
// 	const targetBlockElement = document.querySelector(targetBlock);
// 	if (targetBlockElement) {
// 		let headerItem = '';
// 		let headerItemHeight = 0;
// 		if (noHeader) {
// 			headerItem = 'header.header';
// 			const headerElement = document.querySelector(headerItem);
// 			if (!headerElement.classList.contains('_header-scroll')) {
// 				headerElement.style.cssText = `transition-duration: 0s;`;
// 				headerElement.classList.add('_header-scroll');
// 				headerItemHeight = headerElement.offsetHeight;
// 				headerElement.classList.remove('_header-scroll');
// 				setTimeout(() => {
// 					headerElement.style.cssText = ``;
// 				}, 0);
// 			} else {
// 				headerItemHeight = headerElement.offsetHeight;
// 			}
// 		}
// 		let options = {
// 			speedAsDuration: true,
// 			speed: speed,
// 			header: headerItem,
// 			offset: offsetTop,
// 			easing: 'easeOutQuad',
// 		};
// 		// Закриваємо меню, якщо воно відкрите
// 		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

// 		if (typeof SmoothScroll !== 'undefined') {
// 			// Прокручування з використанням доповнення
// 			new SmoothScroll().animateScroll(targetBlockElement, '', options);
// 		} else {
// 			// Прокручування стандартними засобами
// 			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
// 			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
// 			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
// 			window.scrollTo({
// 				top: targetBlockElementPosition,
// 				behavior: "smooth"
// 			});
// 		}
// 		FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
// 	} else {
// 		FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
// 	}
// };



// export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
// 	const targetBlockElement = document.querySelector(targetBlock);
// 	if (targetBlockElement) {
// 		let headerItem = '';
// 		let headerItemHeight = 0;

// 		if (noHeader) {
// 			headerItem = 'header.header';
// 			const headerElement = document.querySelector(headerItem);

// 			if (headerElement) {
// 				// Если хедер существует
// 				if (!headerElement.classList.contains('_header-scroll')) {
// 					headerElement.style.cssText = `transition-duration: 0s;`;
// 					headerElement.classList.add('_header-scroll');
// 					headerItemHeight = headerElement.offsetHeight;
// 					headerElement.classList.remove('_header-scroll');
					
// 					// Небольшая задержка перед сбросом стилей
// 					setTimeout(() => {
// 						headerElement.style.cssText = ``;
// 					}, 500);
// 				} else {
// 					headerItemHeight = headerElement.offsetHeight;
// 				}
// 			}
// 		}

// 		// Убедитесь, что offsetTop равен 0 для перехода к верхней части
// 		let options = {
// 			speedAsDuration: true,
// 			speed: speed,
// 			header: headerItem,
// 			offset: 0, // Принудительно устанавливаем 0 для прокрутки к верху экрана
// 			easing: 'easeOutQuad',
// 		};

// 		// Закрываем меню, если оно открыто
// 		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

// 		if (typeof SmoothScroll !== 'undefined') {
// 			// Используем SmoothScroll для анимации прокрутки
// 			new SmoothScroll().animateScroll(targetBlockElement, '', options);
// 		} else {
// 			// Стандартная прокрутка
// 			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
// 			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;

// 			// Прокрутка к верхней части
// 			window.scrollTo({
// 				top: targetBlockElementPosition,
// 				behavior: "smooth"
// 			});
// 		}

// 		// Сообщение об успешной прокрутке
// 		FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
// 	} else {
// 		// Сообщение об отсутствии блока
// 		FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
// 	}
// };


export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = '';
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = 'header.header';
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains('_header-scroll')) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add('_header-scroll');
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove('_header-scroll');
				setTimeout(() => {
					headerElement.style.cssText = ``;
				}, 0);
			} else {
				headerItemHeight = headerElement.offsetHeight;
			}
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad',
		};
		// Закриваємо меню, якщо воно відкрите
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

		if (typeof SmoothScroll !== 'undefined') {
			// Прокручування з використанням доповнення
			new SmoothScroll().animateScroll(targetBlockElement, '', options);
		} else {
			// Прокручування стандартними засобами
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		}
		FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
	} else {
		FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
	}
};