// import webp from "gulp-webp";
// import imagemin from "gulp-imagemin";
// import squoosh from "gulp-squoosh";
import sharpResponsive from "gulp-sharp-responsive";

export const images = () => {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "Images",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.newer(app.path.src.images))
		.pipe(app.plugins.if(
			app.imgOptimization,
			sharpResponsive({
				formats: [
					{
						format: 'webp'
					},
					{
						format: 'jpeg'
					},
				]
			})
		))
		.pipe(app.gulp.dest(app.path.build.images))

		// .pipe(app.gulp.src(app.path.src.images))
		// .pipe(app.plugins.newer(app.path.build.images))
		// .pipe(imagemin())
		// .pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images))

		.pipe(app.plugins.browsersync.stream())
}

export const imgResponsiveSM = () => {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "imgResponsiveSM",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(sharpResponsive({
			formats: [
				/* {
					width: (metadata) => metadata.width >= app.bp.sm ? app.bp.sm : metadata.width,
					format: "avif"
				}, */
				{
					width: (metadata) => metadata.width >= app.bp.sm ? app.bp.sm : metadata.width,
					format: "webp",
					rename: { prefix: '-sm--' }
				},
				{
					width: (metadata) => metadata.width >= app.bp.sm ? app.bp.sm : metadata.width,
					format: "jpeg",
					rename: { prefix: '-sm--' }
				},
			]
		}))
		.pipe(app.gulp.dest(app.path.temp.imagesResponsive + 'sm/'))
		.pipe(app.gulp.dest(app.path.build.imagesResponsive + 'sm/'))
}
export const imgResponsiveMD = () => {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "imgResponsiveMD",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(sharpResponsive({
			formats: [
				/* {
					width: (metadata) => metadata.width >= app.bp.md ? app.bp.md : metadata.width,
					format: "avif"
				}, */
				{
					width: (metadata) => metadata.width >= app.bp.md ? app.bp.md : metadata.width,
					format: "webp",
					rename: { prefix: '-md--' }
				},
				{
					width: (metadata) => metadata.width >= app.bp.md ? app.bp.md : metadata.width,
					format: "jpeg",
					rename: { prefix: '-md--' }
				},
			]
		}))
		.pipe(app.gulp.dest(app.path.temp.imagesResponsive + 'md/'))
		.pipe(app.gulp.dest(app.path.build.imagesResponsive + 'md/'))
}
export const imgResponsiveLG = () => {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "imgResponsiveLG",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(sharpResponsive({
			formats: [
				/* {
					width: (metadata) => metadata.width >= app.bp.lg ? app.bp.lg : metadata.width,
					format: "avif"
				}, */
				{
					width: (metadata) => metadata.width >= app.bp.lg ? app.bp.lg : metadata.width,
					format: "webp",
					rename: { prefix: '-lg--' }
				},
				{
					width: (metadata) => metadata.width >= app.bp.lg ? app.bp.lg : metadata.width,
					format: "jpeg",
					rename: { prefix: '-lg--' }
				},
			]
		}))
		.pipe(app.gulp.dest(app.path.temp.imagesResponsive + 'lg/'))
		.pipe(app.gulp.dest(app.path.build.imagesResponsive + 'lg/'))
}