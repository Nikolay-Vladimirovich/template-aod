// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

import { readFileSync } from "fs";
import { join } from "path";

const metaFolder = `./gulp/builder-creator/meta-easy`;

const packageData = readFileSync(join(process.cwd(), metaFolder, "_package.json"), "utf8");
const { version } = JSON.parse(packageData);

const srcFolder = `./src`;
const productionFolder = `./prod`;

// const tempFolder = `./__temporaryBuilderFiles`;
// *
const productionFiles = [
	`${productionFolder}/**/*.*`,
	`!${productionFolder}/js/**/*.*`,
	`!${productionFolder}/css/**/*.*`,
];
const jsSrcFolder = `${srcFolder}/js`;
const cssSrcFolder = `${productionFolder}/css`;
const buildFolder = `./${rootFolder}-builder-easy-v${version}`; // Путь к папке с результатом.

export const path = {
	metaFolder: `${metaFolder}`,
	metaFiles: `${metaFolder}/**/*.*`,
	//
	jsSrcFolder: jsSrcFolder,
	jsSrcFiles: [
		`${jsSrcFolder}/classes/*.js`,
		`${jsSrcFolder}/utils/*.js`,
		`${jsSrcFolder}/functions/*.js`,
		`${jsSrcFolder}/app.js`,
	],
	//
	cssSrcFolder: cssSrcFolder,
	cssSrcFiles: `${cssSrcFolder}/style.css`,
	//
	srcFolder: srcFolder,
	buildFolder: buildFolder,

	rootFolder: rootFolder,
	metaFolder: metaFolder,

	productionFiles: productionFiles,
};
