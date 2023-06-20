import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; // Сжатие CSS файлов
import size from "gulp-size";

export const css = () => {
	return (
		app.gulp
			.src(app.path.src.css, { sourcemaps: false })
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: "CSS",
						message: "Error: <%= error.message %>",
					}),
				),
			)
			.pipe(size({ title: "CSS до сжатия" }))
			.pipe(
				rename({
					basename: "style",
					extname: ".min.css",
				}),
			)
			.pipe(cleanCss())
			.pipe(size({ title: "CSS после сжатия" }))
			.pipe(app.gulp.dest(app.path.build.css, { sourcemaps: false }))
	);
};
