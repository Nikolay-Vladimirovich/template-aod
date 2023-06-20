export function validation() {
	let submitButton = document.querySelector('.btn--submit');
	let form = document.querySelector('.form'); // Поиск элемента form
	let formFlds = form.querySelectorAll('.check'); // Поиск узлов c классом check в form
	let tooltips = document.querySelector('.subscribe__tooltips'); // Поиск узлов c классом tooltips в form

	let submitTimeout = 2000; // Задержка перед отправкой формы на сервер

	let patterns = {
		// Регулярные выражения для проверки полей:
		notEmpty: /.+/,
		phone: /^\d{7,15}$/,
		email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
	}

	let validTooltips = {
		// Подсказки к неправильно заполненным полям:
		notEmpty: 'не должно быть пустым!',
		phone: 'должен содержать не менее 7 цифр',
		email: 'не соответствует формату your@email.com'
	}

	submitButton.addEventListener('click', function (e) {
		let hasError = false; // Переменная определяющая наличие ошибок в заполнении формы
		if (tooltips) {
			tooltips.innerHTML = ''; // Обнуляем подсказки к неравильно заполненным полям
		}

		formFlds.forEach(fld => {// Перебираем все поля из коллекции узлов

			let v = fld.value.trim(); // Удаляем пробельные символы            
			let validationType = fld.dataset.valid; // Берем значение аттрибута data-valid            
			let pattern = patterns[validationType]; // Присваиваем рег.выражение в зависимости от аттрибута data-valid
			let fldLabel;
			if (tooltips) {
				fldLabel = fld.dataset.tooltip; // Получаем текст метки к полю
			}
			// Сравниваем значение текущего поля с соответствующей ему регуляркой:
			if (!pattern.test(v)) { // Если не совпадает, то...

				fld.classList.add('err'); // Добавляем класс к неправильно заполненному полю
				fld.focus();
				hasError = true; // Изменяем переменную, т.к. есть ошибка

				// Выводим подсказки к неравильно заполненным полям:
				if (tooltips) {
					tooltips.innerHTML +=
						'<p><b>' + fldLabel + '</b> ' + validTooltips[validationType] + "</p>";
				}
			}
		});



		// Если есть ошибка, отменяем отправку формы:
		if (hasError) {
			e.preventDefault();
		} else {
			tooltips.innerHTML = '';
			e.preventDefault();
			setTimeout(
				() => {
					/* form.submit() */
					tooltips.innerHTML = "Отправлено!";
				},  // Отправка формы... 
				submitTimeout, // ...спустя заданное время
				tooltips.classList.add('success'),
				tooltips.innerHTML += "Отправляю данные формы на сервер!"
				// ...и сообщением, отображаемой до истечения заданного времени
			);

		}
	});

	/* form.addEventListener('focusin', function (e) { // При фокусе в каком либо элементе внутри form
		if (e.target.classList.contains('check')) { // На всплытии события отлавливаем поля с классом check
			e.target.classList.remove('err'); // Удаляем класс неправильно заполненного поля

		}
	}); */

	form.addEventListener('input', function (e) { // При фокусе в каком либо элементе внутри form
		if (e.target.classList.contains('check')) { // На всплытии события отлавливаем поля с классом check
			e.target.classList.remove('err'); // Удаляем класс неправильно заполненного поля
			tooltips.innerHTML = '';
		}
	})

	form.addEventListener('input', function (e) { // При фокусе в каком либо элементе внутри form
		if (e.target.classList.contains('check') && e.target.dataset.valid == "phone") { // На всплытии события отлавливаем поля с классом check
			let v = e.target.value;
			e.target.value = v.replace(/\D/g, '');
		}
	})

}