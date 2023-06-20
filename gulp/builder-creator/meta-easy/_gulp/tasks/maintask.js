export const maintask = () => {
	return app.gulp
		.src(app.path.src.main)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "Maintask",
					message: "Error: <%= error.message %>",
				}),
			),
		)
		.pipe(app.gulp.dest(app.path.buildFolder));
};
