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


export const scssColorScheme = () => {
	return app.gulp.src(
		app.path.src.scssColorScheme,	{ sourcemaps: false /* app.isDev */ }
	)
		.pipe(
			app.plugins.if(
				app.isMultipleColorScheme,
				app.plugins.plumber(app.plugins.notify.onError({
					title: "SCSS ColorSchemes",
					message: "Error: <%= error.message %>"
				}))
			)
		)
		.pipe(app.plugins.if(app.isMultipleColorScheme, sassGlob()))
		.pipe(app.plugins.if(app.isMultipleColorScheme, sass({
			outputStyle: 'expanded'
		})))
		.pipe(webpcss({
			webpClass: ".webp",
			noWebpClass: ".no-webp"
		}))
		.pipe(app.plugins.replace(/@assets\//g, '../')) // Обработка алиасов

		.pipe(app.plugins.if(app.isMultipleColorScheme, autoprefixer()))
		// Не сжатый дубль css
		.pipe(app.plugins.if(app.isMultipleColorScheme, app.gulp.dest(app.path.build.css)))
		.pipe(app.plugins.if(app.isMultipleColorScheme, size({ title: "CSS ColorSchemes до сжатия" })))
		.pipe(app.plugins.if(app.isMultipleColorScheme, rename({
			extname: ".min.css"
		})))
		.pipe(app.plugins.if(app.isMultipleColorScheme, app.plugins.if(app.isBuild, cleanCss())))
		.pipe(app.plugins.if(app.isMultipleColorScheme, size({ title: "CSS ColorSchemes после сжатия" })))
		.pipe(app.plugins.if(app.isMultipleColorScheme, app.gulp.dest(app.path.build.css, { sourcemaps: false /* app.isDev */ })))

		.pipe(app.plugins.if(app.isMultipleColorScheme, app.gulp.dest(app.path.build.css)))
		.pipe(app.plugins.browsersync.stream());
}