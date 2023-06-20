import buffer from "vinyl-buffer";
import imagemin from "gulp-imagemin";
import merge from "merge-stream";

import spritesmith from "gulp.spritesmith";

export const imgSprive = () => {
	// Generate our spritesheet
	var spriteData = app.gulp.src(app.path.src.sprites)
		.pipe(spritesmith({
			imgName: '../assets/img/sprite.png',
			cssName: 'sprite.scss'
		}));

	// Pipe image stream through image optimizer and onto disk
	var imgStream = spriteData.img
		// DEV: We must buffer our stream into a Buffer for `imagemin`
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(app.gulp.dest(app.path.srcFolder + '/assets/img/'));

	// Pipe CSS stream through CSS optimizer and onto disk
	var cssStream = spriteData.css
		.pipe(app.gulp.dest(app.path.srcFolder + '/scss/sprites/'));

	// Return a merged stream to handle both `end` events
	return merge(imgStream, cssStream);

}