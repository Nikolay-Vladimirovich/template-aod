// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

let buildFolder; // Путь к папке с результатом. Можно использовать rootFolder
if (process.argv.includes("--production")) {
	buildFolder = `./prod`;
} else {
	buildFolder = `./dist`;
}
if (process.argv.includes("--demo")) {
	buildFolder = `./demosources`;
}
const srcFolder = `./src`; // Путь к папке с исходниками
const publicFolder = `./public`; // Путь к папке с исходниками

const jsMainSourceFiles = [
	// `${srcFolder}/js/classes/*.js`,
	// `${srcFolder}/js/utils/*.js`,
	// `${srcFolder}/js/functions/*.js`,
	`${srcFolder}/js/app.js`,
];

export const path = {
	build: {
		devutils: {
			html: `${buildFolder}/dev-utils/`,
			js: `${buildFolder}/dev-utils/js`,
			css: `${buildFolder}/dev-utils/css`,
			images: `${buildFolder}/dev-utils/img/`,
		},
		js: `${buildFolder}/js/`,
		jsExt: `${buildFolder}/js/extensions_app/`,
		jsColorScheme: `${buildFolder}/js/colorscheme/`,
		css: `${buildFolder}/css/`,
		cssExt: `${buildFolder}/css/extensions/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`, // Картинки и svg-спрайты
		fonts: `${buildFolder}/fonts/`,
		iconfonts: `${buildFolder}/iconfonts/`,
		favicon: `${buildFolder}/favicon/`,

		svgsprites: `${srcFolder}/assets/img/svgsprites/`, // Сначала в path.src, а затем задача img автоматически перекинет в path.build.images
		imagesResponsive: `${buildFolder}/imr/`,
	},
	temp: {
		imagesResponsive: `${srcFolder}/imr/`,
	},
	src: {
		devutils: {
			html: `${srcFolder}/dev-utils/*.html`,
			js: `${srcFolder}/dev-utils/js/dev-utils.js`,
			scss: `${srcFolder}/dev-utils/scss/dev-utils.scss`,
			images: `${srcFolder}/dev-utils/img/*.*`,
		},
		js: {
			main: jsMainSourceFiles,
			colorScheme: `${srcFolder}/js/colorscheme.js`,
			entry: `${srcFolder}/js/app.js`,
			entryWithColorScheme: `${srcFolder}/js/app-with-colorscheme.js`,
		},
		jsExt: {
			main: `${srcFolder}/js_extapp/**/*.js`,
			entry: `${srcFolder}/js_extapp/extensions.app.js`,
		},
		scss: [`${srcFolder}/scss/style.scss`],
		scssMultipleScheme: `${srcFolder}/scss/style_multiple_scheme.scss`,
		scssStandartScheme: `${srcFolder}/scss/style_standart_scheme.scss`,
		scssColorScheme: [
			`${srcFolder}/scss/color-scheme-light.scss`,
			`${srcFolder}/scss/color-scheme-dark.scss`,
		],

		scssExt: `${srcFolder}/scss_ext/*.scss`,

		html: `${srcFolder}/*.html`,
		// html:  `${srcFolder}/*.pug`,
		images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,webp,avif}`,
		imagesResponsive: `${srcFolder}/imr/**/*.{jpg,jpeg,png,gif,webp,avif}`,
		sprites: `${srcFolder}/sprites_src/other/*.{jpg,jpeg,png,webp,avif}`,
		svgsprites: `${srcFolder}/sprites_src/svg/*.svg`,
		svg: `${srcFolder}/assets/img/**/*.svg`,
		favicon: `${srcFolder}/assets/favicon/favicon.svg`,
		iconfonts: `${srcFolder}/assets/iconfonts/*.*`,
	},
	watch: {
		devutils: {
			html: `${srcFolder}/dev-utils/*.html`,
			js: `${srcFolder}/dev-utils/js/dev-utils.js`,
			scss: `${srcFolder}/dev-utils/scss/dev-utils.scss`,
			images: `${srcFolder}/dev-utils/img/*.*`,
		},
		// js: [
		// 	...jsMainSourceFiles,
		// 	`${srcFolder}/js/colorscheme.js`
		// ],
		js: `${srcFolder}/js/**/*.js`,
		jsExt: `${srcFolder}/js_extapp/extensions.app.js`,
		scss: [
			`${srcFolder}/scss/**/*.scss`,
			`${srcFolder}/components/**/*.scss`,
			`${srcFolder}/template/**/*.scss`,
		],
		scssColorScheme: [
			`${srcFolder}/scss/color-scheme-light.scss`,
			`${srcFolder}/scss/color-scheme-dark.scss`,
		],
		scssExt: `${srcFolder}/scss_ext/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		// html: `${srcFolder}/**/*.pug`,
		images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,svg,gif,webp,avif}`,
		iconfonts: `${srcFolder}/assets/iconfonts/`,
	},
	clean: {
		devutils: `${buildFolder}/dev-utils/`,
		// devutils: {
		// 	html: `${buildFolder}/dev-utils/`,
		// 	js: `${buildFolder}/dev-utils/js`,
		// 	css: `${buildFolder}/dev-utils/css`,
		// 	images: `${buildFolder}/dev-utils/img/`,
		// },
		js: `${buildFolder}/js/*.js`,
		jsExt: `${buildFolder}/js/extensions_app/**/*.js`,
		css: `${buildFolder}/css/*.css`,
		cssExt: `${buildFolder}/css/extensions/**/*.css`,
		html: `${buildFolder}/*.html`,
		images: `${buildFolder}/{img,img/content}/**/*.*`,
		imagesResponsive: [`${srcFolder}/imr/`, `${buildFolder}/imr/`],
		sprites: [`${srcFolder}/img/sprite.png`, `${srcFolder}/scss/sprites/sprite.scss`],
		svgsprites: `${buildFolder}/img/svgsprites/`,
		fonts: `${buildFolder}/fonts/`,
		fontfaces: `${srcFolder}/scss/base/_fonts.scss`,
		favicons: [
			`${buildFolder}/favicon/`,
			`${buildFolder}/apple-touch-icon.png`,
			`${buildFolder}/favicon.ico`,
			`${buildFolder}/manifest.json`,
		],
	},
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `test/`,
};
