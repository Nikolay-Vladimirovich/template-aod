// import webp from "gulp-webp";
// import webpack from "webpack-stream";
// import size from "gulp-size";
import gulpSass from 'gulp-sass';
import dartSass from 'sass'; // Компилятор
// import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
// import rename from 'gulp-rename';
const sass = gulpSass(dartSass); // Передача в константу непосредственно компилятора

export const devCopy = () => {
	return app.gulp.src(app.path.src.devutils.html)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "Dev - copy",
			message: "Error: <%= error.message %>"
		})
	))
	.pipe(app.gulp.dest(app.path.build.devutils.html))
	.pipe(app.plugins.browsersync.stream())
}
export const devImages = () => {
	return app.gulp.src(app.path.src.devutils.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "Dev - images",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.newer(app.path.build.devutils.images))
		.pipe(app.gulp.dest(app.path.build.devutils.images))
		.pipe(app.plugins.browsersync.stream())
}
export const devJS = () => {
	return app.gulp.src(app.path.src.devutils.js, { sourcemaps: false })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "Dev - JavaScript",
				message: "Error: <%= error.message %>"
			})
		))	
		.pipe(app.gulp.dest(app.path.build.devutils.js, { sourcemaps: false }))
		.pipe(app.plugins.browsersync.stream())
}
export const devSCSS = () => {
	return app.gulp.src(app.path.src.devutils.scss, { sourcemaps: false })
		.pipe(app.plugins.plumber(app.plugins.notify.onError({
			title: "DEV-SCSS",
			message: "Error: <%= error.message %>"
		})))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(app.plugins.replace(/@img\//g, '../img/')) // Обработка алиасов @img
		.pipe(app.gulp.dest(app.path.build.devutils.css, { sourcemaps: false }))
		.pipe(app.plugins.browsersync.stream());
}