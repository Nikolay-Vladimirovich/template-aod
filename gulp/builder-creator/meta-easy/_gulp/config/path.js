// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./production`; // Путь к папке с результатом. Можно использовать rootFolder
const srcFolder = `./src`; // Путь к папке с исходниками

const jsMainSourceFiles = [
	// `${srcFolder}/js/classes/*.js`,
	// `${srcFolder}/js/utils/*.js`,
	// `${srcFolder}/js/functions/*.js`,
	`${srcFolder}/js/app.js`,
];
export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
	},
	src: {
		main: [`${srcFolder}/**/*.*`, `!${srcFolder}/js/**/*.*`, `!${srcFolder}/css/**/*.*`],
		js: {
			main: jsMainSourceFiles,
			entry: `${srcFolder}/js/app.js`,
		},
		css: `${srcFolder}/css/*.css`,
	
	},
	// watch: {},
	// clean: {},
	rootFolder: rootFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
};
