import * as dartSass from 'sass'; // Компилятор
import gulpSass from 'gulp-sass';

import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файлов
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений, тут придется "потанцевать с бубном", а именно:
// Необходим javascipt-код, определяющий поддерживает наш браузер webp-изображения или нет и
// добавлял соответствующий класс по которому этот плагин будет работать,
// и webp-конвертер который необходимо установить и очень важно версию 2.2.3
// npm i -D webp-converter@2.2.3

import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
// import shorthand from "gulp-shorthand";
// import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

const sass = gulpSass(dartSass); // Передача в константу непосредственно компилятора

import sassGlob from "gulp-sass-glob";
import size from "gulp-size";


export const scss = () => {
	return app.gulp.src(
		app.plugins.if(
			app.isMultipleColorScheme,
			app.path.src.scssMultipleScheme,
			app.path.src.scssStandartScheme
		),
		{ sourcemaps: false /* app.isDev */ }
	)
		.pipe(app.plugins.plumber(app.plugins.notify.onError({
			title: "SCSS",
			message: "Error: <%= error.message %>"
		})))
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		// .pipe(groupCssMediaQueries())
		//.pipe(shorthand()); 
		// Включать исключительно после финальной ПРОВЕРКИ работы css для дополнительной оптимизации css.
		// Т.к. shorthand Ломает работу некоторых свойств css, обнуляя их либо перекрывая.
		// К примеру для spritesmith и webp - заменяет background-image на сокращенную запись background и отменяет background-position для спрайтов
		.pipe(webpcss({
			webpClass: ".webp",
			noWebpClass: ".no-webp"
		}))
		.pipe(app.plugins.replace(/@assets\//g, '../')) // Обработка алиасов

		.pipe(autoprefixer())
		// Не сжатый дубль css
		.pipe(rename({
			basename: "style"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		// .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
		.pipe(size({ title: "CSS до сжатия" }))
		.pipe(rename({
			basename: "style",
			extname: app.plugins.if(/* app.isBuild &&  */app.needCSSMin, ".min.css", ".css")
		}))
		.pipe(app.plugins.if(/* app.isBuild &&  */app.needCSSMin, cleanCss()))
		.pipe(size({ title: "CSS после сжатия" }))
		.pipe(app.gulp.dest(app.path.build.css, { sourcemaps: false /* app.isDev */ }))
		.pipe(app.plugins.browsersync.stream());
}