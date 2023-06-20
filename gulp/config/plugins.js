import replace from "gulp-replace"; // Поиск и замена
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщени (подсказки)
import browsersync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer"; // Проверка обновлений (картинок)
import ifPlugin from "gulp-if"; // Условное ветвление

/*
replace для замены alias'ов "@img" и т.п.
replace работает в связке с расширением для vscode - path-autocomplete
в settings.json так же необхоимо добавить следующие настройки:

"path-autocomplete.pathMappings": {
	 "@img": "${folder}/src/img", // alias for images
	 "@scss": "${folder}/src/scss", // alias for scss
	 "@js": "${folder}/src/js", // alias for js
},

*/


// Экспортируем объект
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin
}