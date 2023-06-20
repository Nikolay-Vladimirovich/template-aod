export const iconfonts = () => {
	return app.gulp.src(app.path.src.iconfonts)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "Icon Fonts",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.newer(app.path.src.iconfonts))
		.pipe(app.gulp.dest(app.path.build.iconfonts))

		.pipe(app.plugins.browsersync.stream())
}