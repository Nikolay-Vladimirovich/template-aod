import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщени (подсказки)
// Экспортируем объект
export const plugins = {
	plumber: plumber,
	notify: notify,
}