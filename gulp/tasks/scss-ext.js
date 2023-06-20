import gulpSass from "gulp-sass";
import * as dartSass from 'sass'; // Компилятор

import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; // Сжатие CSS файлов
// import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений, тут придется "потанцевать с бубном", а именно:
// Необходим javascipt-код, определяющий поддерживает наш браузер webp-изображения или нет и
// добавлял соответствующий класс по которому этот плагин будет работать,
// и webp-конвертер который необходимо установить и очень важно версию 2.2.3
// npm i -D webp-converter@2.2.3

// import shorthand from "gulp-shorthand";

const sass = gulpSass(dartSass); // Передача в константу непосредственно компилятора

import sassGlob from "gulp-sass-glob";
import size from "gulp-size";

export const scssExt = () => {
	return (
		app.gulp
			.src(app.path.src.scssExt, { sourcemaps: app.isDev })
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "SCSS EXTENSIONS",
						message: "Error: <%= error.message %>",
					}),
				),
			)
			.pipe(sassGlob())
			.pipe(
				sass({
					outputStyle: "expanded",
				}),
			)
			// .pipe(groupCssMediaQueries())
			//.pipe(shorthand());
			// Включать исключительно после финальной ПРОВЕРКИ работы css для дополнительной оптимизации css.
			// Т.к. shorthand Ломает работу некоторых свойств css, обнуляя их либо перекрывая.
			// К примеру для spritesmith и webp - заменяет background-image на сокращенную запись background и отменяет background-position для спрайтов
			// .pipe(webpcss({
			// 	webpClass: ".webp",
			// 	noWebpClass: ".no-webp"
			// }))
			// .pipe(app.plugins.replace(/@img\//g, '../img/')) // Обработка алиасов @img

			// .pipe(autoprefixer({
			// 	grid: true,
			// 	overrideBrowserlist: ["last 3 versions"],
			// 	cascade: true
			// }))
			// Не сжатый дубль css
			// .pipe(
			// 	app.gulp.dest(app.path.build.css_ext)
			// )
			.pipe(size({ title: "CSS EXTENSIONS до сжатия" }))
			.pipe(
				rename({
					extname: ".min.css",
				}),
			)
			.pipe(app.plugins.if(app.isBuild, cleanCss()))
			.pipe(size({ title: "CSS EXTENSIONS после сжатия" }))

			.pipe(
				app.plugins.if(
					app.hasScssExtensions,
					app.gulp.dest(app.path.build.cssExt, { sourcemaps: app.isDev }),
				),
			)
			.pipe(app.plugins.browsersync.stream())
	);
};
