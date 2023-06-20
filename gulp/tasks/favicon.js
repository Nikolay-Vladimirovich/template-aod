import favicons from "gulp-favicons";
import filter from "gulp-filter";
import { deleteAsync } from "del";

export const favicon = () => {
	return app.gulp.src(app.path.src.favicon)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "Favicon: <%= error.message %>"
			})
		))
		.pipe(app.gulp.dest(app.path.build.favicon))
		.pipe(favicons({
			icons: {
				favicons: true,
				appleIcon: true,
				android: true,
				windows: false,
				yandex: false,
				coast: false,
				firefox: false,
				appleStartup: false
			},
			path: "favicon/"
		}))
		.pipe(app.gulp.dest(app.path.build.favicon))
		.pipe(filter(['favicon.ico', 'apple-touch-icon.png', 'manifest.json']))
		.pipe(app.gulp.dest(app.path.buildFolder));
}
// Очистка от лишних favicon
export const faviconClean = () => {
	return deleteAsync([
		app.path.build.favicon + '/favicon.ico',
		app.path.build.favicon + '/apple-touch-icon.png',
		app.path.build.favicon + '/manifest.json']);
}