import gulp from "gulp";

import regexRename from "gulp-regex-rename";

import { path } from "./builder-path.js";

global.bc = {
	path: path,
};
const copyMeta = () => {
	return app.gulp
		.src(bc.path.metaFiles)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "builderCreator",
					message: "Error: <%= error.message %>",
				}),
			),
		)
		.pipe(regexRename(/\_/, ""))
		.pipe(app.gulp.dest(bc.path.buildFolder))
};
const copyMain = () => {
	return app.gulp.src(bc.path.productionFiles).pipe(app.gulp.dest(`${bc.path.buildFolder}/src/`));
};

const copyJs = () => {
	return app.gulp
		.src(bc.path.jsSrcFiles, { base: bc.path.jsSrcFolder })
		.pipe(app.gulp.dest(`${bc.path.buildFolder}/src/js/`));
};

const copyCss = () => {
	return app.gulp
		.src(bc.path.cssSrcFiles)
		.pipe(app.gulp.dest(`${bc.path.buildFolder}/src/css/`));
};

const builderCreator = gulp.series(copyMeta, copyMain, copyJs, copyCss);

// export { js };
export { builderCreator };
