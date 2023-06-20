import fileInclude from "gulp-file-include";

import htmlImgWrapper from "gulp-html-img-wrapper";
// import pictureHTML from "gulp-picture-html";
// import imgToPicture from "gulp-html-php-picture";
// import webpHtml from "gulp-webp-html-nosvg";
// import webpHtml from "gulp-xv-webp-html";
import htmlBeautify from "gulp-html-beautify";
import versionNumber from "gulp-version-number";
//import pug from "gulp-pug";

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "HTML",
					message: "Error: <%= error.message %>"
				})
			)
		)
		.pipe(fileInclude({
			context: {
				isBuild: app.isBuild,
				isDev: app.isDev,
				hasSvgX: app.svgx,
				hasDark: app.dark,
				isDevUtilsEnable: app.isDev,
				hasScssExtensions: app.hasScssExtensions,
				hasJSExtensions: app.hasJSExtensions,
				isMultipleColorScheme: app.isMultipleColorScheme,
				dubiousMeta: app.dubiousMeta,
				needJSMin: app.needJSMin,
				needCSSMin: app.needCSSMin,
			}
		}))
		/* .pipe(pug({
		  // если подключаем пайп pug то надо прописать/раскомментировать пути для pug файлов в config/path.js
		  // Сжатие HTML файла
		  pretty: true,
		  // Показывать в терминале какой файл обработан
		  verbose: true
  
		})) */

		.pipe(app.plugins.replace(/@assets\//g, './'))
		.pipe(app.plugins.if(
			app.imgOptimization,
			htmlImgWrapper({
				logger: true, // false for not showing message with amount of wrapped img tags for each file
				extensions: ['.jpg', '.png', '.jpeg'], // write your own extensions pack (case insensitive)
			})
		))
		.pipe(htmlBeautify({ "indent_with_tabs": true }))
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream())
}