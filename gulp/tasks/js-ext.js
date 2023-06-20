import webpack from "webpack-stream";
import size from "gulp-size";
// Устанавливаем и этот модуль и сам webpack
// Для этого в консоли пишем:
// npm i -D webpack webpack-stream

export const jsExt = () => {
	return app.gulp.src(app.path.src.jsExt.main, { sourcemaps: false /* app.isDev */ })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JavaScript EXT APP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(size({ title: "jsExt до обработки WEBPACK" }))
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			// mode: 'none',
			entry: app.path.src.jsExt.entry,
			output: {
				filename: 'extensions.app.min.js',
			},
			module: app.settings.webpackExt.module
		}))
		.pipe(size({ title: "jsExt после обработки WEBPACK" }))
		.pipe(app.gulp.dest(app.path.build.jsExt, { sourcemaps: false /* app.isDev */ }))
		.pipe(app.plugins.browsersync.stream())
}