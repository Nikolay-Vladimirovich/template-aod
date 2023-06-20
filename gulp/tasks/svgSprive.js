import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
	return app.gulp.src(app.path.src.svgsprites, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(svgSprite({

			mode: {
				stack: {
					sprite: `../svgsprites.svg`,
					// Создать страницу с перечнем иконок
					// example: true
				}
			}

		}))
		.pipe(app.gulp.dest(app.path.build.svgsprites));
}
