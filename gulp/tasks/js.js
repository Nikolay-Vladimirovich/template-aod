import size from "gulp-size";
import webpack from "webpack-stream";
// import babel from "gulp-babel";
// Устанавливаем и этот модуль и сам webpack
// Для этого в консоли пишем:
// npm i -D webpack webpack-stream

export const js = () => {
	return (
		app.gulp
			.src(
				app.plugins.if(
					app.isMultipleColorScheme,
					[...app.path.src.js.main, app.path.src.js.colorScheme],
					app.path.src.js.main,
				),
				{
					allowEmpty: true,
					sourcemaps: app.needJSMin && app.isDev
				},
			)
			// return app.gulp.src(app.path.src.js.colorScheme, { allowEmpty: true, sourcemaps: /* false */ app.isDev }
			// )
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "JavaScript",
						message: "Error: <%= error.message %>",
					}),
				),
			)

			// .pipe(babel())
			.pipe(size({ title: "JS до обработки WEBPACK" }))
			.pipe(
				app.plugins.if(
					app.needJSMin,
					webpack({
						// mode: 'none',
						mode: app.isBuild ? "production" : "development",
						entry: app.isMultipleColorScheme
							? app.path.src.js.entryWithColorScheme
							: app.path.src.js.entry,
						devtool: app.isBuild ? false : "source-map",
						output: {
							filename: "app.min.js",
						},
						module: app.settings.webpackBase.module,
					}),
				),
			)
			.pipe(size({ title: "JS после обработки WEBPACK" }))
			.pipe(
				app.gulp.dest(app.path.build.js, {
					sourcemaps: app.needJSMin && app.isDev
				}),
			)
			.pipe(app.plugins.browsersync.stream())
	);
};
