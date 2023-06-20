import fs from 'fs';
import fonter from 'gulp-fonter'; // Позволяет преобразовать из формата otf в ttf и woff
import ttf2woff2 from 'gulp-ttf2woff2'; // Делает все остальное

export const otfToTtf = () => {
	// Ищем файлы шрифтов .otf
	return app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "Fonts",
				message: "Error: <%= error.message %>"
			})
		))
		// Конвертируем в .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Выгружаем в исходную папку
		.pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`))
}

export const ttfToWoff = () => {
	// Ищем файлы шрифтов .ttf
	return app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "Fonts",
				message: "Error: <%= error.message %>"
			})
		))
		// Конвертируем в .woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Ищем файлы шрифтов .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`))
		// Конвертируем в .woff2
		.pipe(ttf2woff2())
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const generateFontFaces = () => {
	// Файл стилей подключения шрифтов
	let fontsFile = `${app.path.srcFolder}/template/base/fonts/_fonts.scss`;
	// Проверяем существует ли файлы шрифтов (исходники)
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		// Проверяем есть ли исходные файлы шрифтов,
		// т.к. не всегда мы их подключаем локально, и тогда их в папке не должно быть
		if (fontsFiles) {
			// Проверяем существует ли файл стилей scss/fonts.scss для подключения шрифтов
			// И если его нет, то только тогда создаем его
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, создаем его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (let i = 0; i < fontsFiles.length; i++) {
					// Записываем подключение шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						fontWeight =
							(fontWeight.toLowerCase().indexOf('italic') > 0)
								? fontWeight.replace('italic', '').toLowerCase()
								: fontWeight.toLowerCase();
						let fontStyle = (fontFileName.toLowerCase().indexOf('italic') > 0) ? 'italic' : 'normal';


						if (fontWeight === 'hairline') {
							fontWeight = 50;
							// ! Не точно, в разных источниках по-разному. В самих шрифтах оказывается тоньше thin
						} else if (fontWeight === 'thin') {
							fontWeight = 100;
						} else if (fontWeight === 'extralight' || fontWeight === 'ultralight') {
							fontWeight = 200;
						} else if (fontWeight === 'light') {
							fontWeight = 300;
						} else if (fontWeight === 'book') {
							fontWeight = 350;
						} else if (fontWeight === 'medium') {
							fontWeight = 500;
						} else if (fontWeight === 'semibold' || fontWeight === 'demibold') {
							fontWeight = 600;
						} else if (fontWeight === 'bold') {
							fontWeight = 700;
						} else if (fontWeight === 'extrabold' || fontWeight === 'ultrabold') {
							fontWeight = 800;
						} else if (fontWeight === 'black' || fontWeight === 'heavy') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}

						fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {

				// Если файл есть, выводим уведомление
				console.log('Файл /template/base/_fonts.scss уже существует. Для обновления файла нужно его удалить!')
				// Благодаря этой проверке мы можем писать файл подключения шрифтов вручную,
				// не боясь, что его перезапишет скрипт
			}
		}
	});
	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
}
