import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
	configFTP.log = util.log;
	const ftpConnect = vinylFTP.create(configFTP);
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FTP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(ftpConnect.dest(`${app.path.ftp}/${app.path.rootFolder}`))
}

// export const ftpQuickUpdate = () => {
// 	configFTP.log = util.log;
// 	const ftpConnect = vinylFTP.create(configFTP);


// 	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
// 		.pipe(app.plugins.plumber(
// 			app.plugins.notify.onError({
// 				title: "FTP",
// 				message: "Error: <%= error.message %>"
// 			})
// 		))
// 		.pipe(
// 			ftpConnect.filter(
// 				`${app.path.ftp}/${app.path.rootFolder}`,
// 				function (file, remote, cb) {
// 					let a = JSON.stringify(file.stat.mtime).replace(/[^\d]/g, '').slice(0, 14);
// 					cb(null, !remote || a > remote.ftp.modify || file.stat.size !== remote.ftp.size);
// 				}
// 			)
// 		)
// 		.pipe(ftpConnect.dest(`${app.path.ftp}/${app.path.rootFolder}`))
// 	/* .pipe(app.plugins.notify({ message: "Обновлен файл: <%= file.relative %>" })) */
// }