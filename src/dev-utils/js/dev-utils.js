// import * as pixelperfect from "./dev-modules/pixelperfect.js";
window.addEventListener('load', pixelperfect);

function pixelperfect() {
	const d = document;
	const b = d.body;
	d.addEventListener('keypress', (event) => {
		// Переключение видимости фона
		// Вся страница
		
		if ((event.shiftKey) && (event.code == 'KeyQ')) {
			b.classList.toggle('dev--overlayed');
			event.preventDefault();
		}
		// if ((event.code == 'KeyQ') && (event.shiftKey)) {
		// 	b.classList.toggle('dev--overlayed-b');
		// 	event.preventDefault();
		// }
		if ((event.shiftKey) && (event.code == 'KeyA')) {
			b.classList.toggle('dev--overlayed-1');
			event.preventDefault();
		}
		if ((event.shiftKey) && (event.code == 'KeyS')) {
			b.classList.toggle('dev--overlayed-2');
			event.preventDefault();
		}

		if ((event.shiftKey) && (event.code == 'KeyW')) {
			b.classList.remove('dev--overlayed');
			b.classList.remove('dev--overlayed-1');
			b.classList.remove('dev--overlayed-2');
			b.classList.remove('dev--overlayed-3');
			event.preventDefault();
		}

		// Блоки по отдельности
		if ((event.code == 'KeyD') && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--overlayed-fullpage');
			event.preventDefault();
		}

		// Смещение фона по вертикали к нужному блоку
		if ((event.code == 'Digit1') && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--overlayed-no-header');
			event.preventDefault();
		}

		// Смещение фона по вертикали к нужному блоку
		if ((event.code == 'KeyG') && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--containers-highlighted');
			event.preventDefault();
		}

		// Обводка
		if ((event.code == 'KeyB') && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--outlined');
			event.preventDefault();
		}
		// Обводка на разметку от js-плагинов
		if ((event.code == 'KeyJ') && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--js-ext-outlined');
			event.preventDefault();
		}

		if ((event.code == 'KeyE') && (event.ctrlKey || event.metaKey)) {
			b.classList.remove('dev--outlined');
			b.classList.remove('dev--containers-highlighted');
			b.classList.remove('dev--overlayed-fullpage');
			b.classList.remove('dev--overlayed');
			b.classList.remove('dev--overlayed-no-header');
			event.preventDefault();
		}
		
	})
}