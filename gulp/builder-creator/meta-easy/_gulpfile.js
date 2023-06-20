"use strict";

// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";
// Импорт настроек
import { settings } from "./gulp/config/settings.js";

// Передаем значения в глобальную переменную
global.app = {
	// isBuild: process.argv.includes("--production"),
	// isDev: !process.argv.includes("--production"),
	path: path,
	gulp: gulp,
	plugins: plugins,
	settings: settings,
};
// Импорт задач
import { resetAll } from "./gulp/tasks/reset.js";
import { maintask } from "./gulp/tasks/maintask.js";
import { js } from "./gulp/tasks/js.js";
import { css } from "./gulp/tasks/css.js";
// *
const build = gulp.series(resetAll, maintask, js, css);

// export { js };
export { build };

// Выполнение сценария по умолчанию
gulp.task("default", build);
