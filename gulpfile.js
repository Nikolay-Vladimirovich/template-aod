"use strict";

// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// import { builderPath } from "./gulp/builder-creator/builder-config/builder-path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";
// Импорт настроек
import { settings } from "./gulp/config/settings.js";

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes("--production"),
	isDev: !process.argv.includes("--production"),
	svgx: process.argv.includes("--svgx"),
	dark: process.argv.includes("--dark"),
	path: path,
	gulp: gulp,
	plugins: plugins,
	settings: settings,
	//
	imgOptimization: true,
	bp: { // Ширина для оптимизации картинок
		sm: 576,
		md: 768,
		lg: 992,
	},
	hasScssExtensions: false,
	hasJSExtensions: false,
	isMultipleColorScheme: false,
	needJSMin: true,
	needCSSMin: true,
	dubiousMeta: false // Сомнительные meta-тэги
};
// Импорт задач
import { devCopy, devImages, devJS, devSCSS } from "./gulp/tasks/devutils.js";
import { favicon, faviconClean } from "./gulp/tasks/favicon.js";
import { generateFontFaces, otfToTtf, ttfToWoff } from "./gulp/tasks/fonts.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { html } from "./gulp/tasks/html.js";
import { iconfonts } from "./gulp/tasks/iconfonts.js";
import {
	images,
	imgResponsiveLG,
	imgResponsiveMD,
	imgResponsiveSM
} from "./gulp/tasks/images.js";
import { imgSprive } from "./gulp/tasks/imgSprive.js";
import { jsExt } from "./gulp/tasks/js-ext.js";
import { js } from "./gulp/tasks/js.js";
import {
	resetAll,
	resetDevUtils,
	resetExt,
	resetFavicons,
	resetFontFaces,
	resetFonts,
	resetImagesResponsive,
	resetMain,
	resetSprites,
	resetSvgSprites
} from "./gulp/tasks/reset.js";
import { scssExt } from "./gulp/tasks/scss-ext.js";
import { scss } from "./gulp/tasks/scss.js";
import { scssColorScheme } from "./gulp/tasks/scssColorScheme.js";
import { server } from "./gulp/tasks/server.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
//
import { builderCreator } from "./gulp/builder-creator/index.js";

// Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.scssColorScheme, scssColorScheme);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.iconfonts, iconfonts);
}
function watcherExt() {
	gulp.watch(path.watch.scssExt, scssExt);
	gulp.watch(path.watch.jsExt, jsExt);
}
function watcherDevutils() {
	gulp.watch(path.watch.devutils.html, devCopy);
	gulp.watch(path.watch.devutils.scss, devSCSS);
	gulp.watch(path.watch.devutils.js, devJS);
	gulp.watch(path.watch.devutils.images, devImages);
}
// Основные задачи
const devutils = gulp.series(resetDevUtils, devJS, devSCSS, devImages, devCopy);
const devutilsLive = gulp.series(devutils, watcherDevutils); // !

const main = gulp.series(
	images,
	gulp.parallel(scss, scssColorScheme, js),
	html,
);

const scssjs = gulp.parallel(scss, scssColorScheme, js);
const quickup = gulp.parallel(scss, scssColorScheme, js, html);
const fontfaces = gulp.series(resetFontFaces, generateFontFaces);

// Генерация ресурсов на старте проекта
const startFavicons = gulp.series(favicon, faviconClean);
const startFonts = gulp.series(otfToTtf, ttfToWoff, fontfaces);
const startSvgSprites = svgSprive;
const startSprites = imgSprive;
const startIconfonts = iconfonts;

const startImagesResponsive = gulp.series(
	imgResponsiveSM,
	imgResponsiveMD,
	imgResponsiveLG,
);

const startAssets = gulp.series(
	images, startSvgSprites, startIconfonts, startImagesResponsive /* , startSprites */,
);

// Генерация ресурсов во время проектирования.
// Отличается очисткой конечных директорий перед каждой задачей
const favicons = gulp.series(resetFavicons, startFavicons);
const fonts = gulp.series(resetFonts, startFonts);
const svgSprites = gulp.series(resetSvgSprites, startSvgSprites);
const sprites = gulp.series(resetSprites, startSprites);
const ifonts= gulp.series(/* resetIconfonts, */startIconfonts);

const imagesr = gulp.series(
	resetImagesResponsive,
	imgResponsiveSM,
	imgResponsiveMD,
	imgResponsiveLG,
);

const assets = gulp.parallel(favicons, svgSprites, sprites /* , fonts */);

// * Быстрое создание архива всего проекта
const qzip = gulp.series(resetMain, main, zip);
// * Быстрая отправка по FTP
const qftp = gulp.series(resetMain, main, ftp);
// * Полная очистка и полная генерация с последующим созданием архива всего проекта
const deployZIP = gulp.series(
	resetMain,
	main,
	startAssets,
	startFonts,
	startFavicons,
	zip,
);
// * Полная очистка и полная генерация с последующей отправкой всего сайта по FTP
const deployFTP = gulp.series(
	resetMain,
	main,
	startAssets,
	startFonts,
	startFavicons,
	ftp,
);

//
const extApp = gulp.series(resetExt, /* jsExt, */ scssExt);
const extAppDev = gulp.series(extApp, watcherExt);
// * Первоначальная (неполная) сборка:
// ! Если есть js в папке js_extapp, то надо раскомментировать jsExt выше в константе extApp
const start = gulp.series(
	resetAll,
	main,
	startAssets,
	extApp,
	gulp.parallel(watcher, watcherExt, server),
);
// ! После ввода этой комманды впервые, необходимо сгенерировать шрифты коммандой gulp fonts
// ! Затем gulp devutils
// ! Затем gulp favicons
//
// ? Шрифты бывают большими и поэтому старт проекта будет слишком долгим, для этого генерация шрифтов производится отдельно
// * Первоначальная (ПОЛНАЯ) сборка:
const startfull = gulp.series(
	resetAll,
	main,
	startAssets,
	startFonts,
	startFavicons,
	devutils,
	extApp,
	gulp.parallel(watcher, watcherExt, watcherDevutils, server),
);


// * Быстрая сборка для разработки:
const dev = gulp.series(resetMain, main, gulp.parallel(watcher, watcherDevutils, server));
const devext = gulp.series(
	resetMain,
	main,
	extApp,
	gulp.parallel(watcher, watcherExt, watcherDevutils, server),
);
// * Продакшен
const build = gulp.series(resetMain, main, startAssets, extApp);
const buildFull = gulp.series(resetAll, main, startAssets, extApp, fonts);

// export { startDevelopment }; // ! npm start
export { start }; // ! gulp start
export { devutils }; // ! gulp devutils
export { devutilsLive }; // ! gulp devutilsLive
export { dev }; // ! gulp dev
export { devext }; // ! gulp devext
export { imagesr }; // ! gulp imagesr
export { html }; // gulp html или npm run html-p для продакшена
export { images }; // gulp html или npm run html-p для продакшена
export { js }; // gulp js или npm run js-p для продакшена
export { scss }; // gulp scss или npm run scss-p для продакшена
export { scssjs }; // gulp scssjs или npm run scssjs-p для продакшена
export { quickup }; // gulp quickup или npm run quickup-p для продакшена
export { main }; // gulp main или npm run main-p для продакшена
export { assets }; // ! gulp assets
export { favicons }; // gulp favicons
export { fonts }; // ! gulp fonts
export { fontfaces }; // gulp fontfaces
export { svgSprites }; // gulp svgSprites
export { sprites }; // gulp sprites
export { ifonts }; // gulp ifonts
// Задачи с флагом --production
export { build }; // npm run product
export { buildFull }; // npm run productFull
export { zip }; //
export { ftp }; //
export { qzip }; // npm run zip-p
export { qftp }; // npm run ftp-p
export { deployZIP }; // npm run zip-d-p
export { deployFTP }; // npm run ftp-d-p
//
export { builderCreator }; // 

// Выполнение сценария по умолчанию
gulp.task("default", startfull); // npm start