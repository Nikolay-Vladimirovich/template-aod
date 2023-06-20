import size from "gulp-size";
import webpack from "webpack-stream";

export const js = () => {
	return (
		app.gulp
			.src(app.path.src.js.main, {
				allowEmpty: true,
				sourcemaps: false,
			})
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "JavaScript",
						message: "Error: <%= error.message %>",
					}),
				),
			)
			.pipe(size({ title: "JS до обработки" }))
			.pipe(
				webpack({
					mode: "production",
					entry: app.path.src.js.entry,
					devtool: false,
					output: {
						filename: "app.min.js",
					},
					module: app.settings.webpackBase.module,
				}),
			)
			.pipe(size({ title: "JS после обработки" }))
			.pipe(
				app.gulp.dest(app.path.build.js, {
					sourcemaps: false,
				}),
			)
	);
};
